import createStore from 'storeon';

const initialState = {
  events: []
};

const ws = store => {
  let ws = null;
  // Initial state
  store.on('@init', () => {
    const connect = () => {
      const { protocol, host, hostname } = window.location;
      let url = `${protocol === 'https:' ? 'wss://' : 'ws://'}${host}`;
      if (hostname === 'localhost') {
        url = 'ws://localhost:3000';
      }
      ws = new window.WebSocket(url);
      ws.addEventListener('open', function(event) {
        ws.send(JSON.stringify({ type: 'ping' }));
      });

      ws.addEventListener('close', () => {
        ws.close();
        ws = null;
        connect();
      });
      ws.addEventListener('message', event => {
        let j = false;
        try {
          j = JSON.parse(event.data);
        } catch (error) {
          j = false;
        }
        if (j) {
          store.dispatch('event/add', j);
        } else {
          console.log(event.data);
        }
      });
    };
    // connect();
    return initialState;
  });
  store.on('event/dispatch', (state, data) => {
    if (ws) {
      ws.send(JSON.stringify(data));
    }
    return state;
  });
  store.on('event/add', ({ events }, event) => {
    return { events: events.concat(event) };
  });
};

const store = createStore([
  ws,
  process.env.NODE_ENV !== 'production' && require('storeon/devtools')
]);
export default store;
