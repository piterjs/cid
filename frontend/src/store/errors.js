export default store => {
  store.on('@init', () => ({ error: null }));

  store.on('errors/server-error', () => console.log('server-error'));
};
