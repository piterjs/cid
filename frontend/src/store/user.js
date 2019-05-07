import http from '../lib/http';

export default store => {
  store.on('@init', () => ({ loading: false, id: null, name: null }));

  store.on('user/toggle-loading', state => ({
    ...state,
    lodaing: !state.loading
  }));

  store.on('user/login', async (user, code) => {
    try {
      store.dispatch('user/toggle-loading');
      const { data } = await http('POST', '/api/login', { code });
      store.dispatch('user/toggle-loading');
      if (data && data.user) {
        store.dispatch('user/save', user);
      } else {
        store.dispatch('errors/message', data.error);
      }
    } catch (e) {
      store.dispatch('user/toggle-loading');
      store.dispatch('errors/server-error');
    }
  });
};
