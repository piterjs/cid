const express = require('express');
const path = require('path');
const http = require('http');
const websocket = require('ws');

const normalizePort = require('./helpers/normalizePort');

const app = express();

const staticPath = path.join(__dirname, 'public');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(staticPath));

app.get('/*', (req, res) => {
  res.sendFile(path.join(staticPath, 'index.html'));
});

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);

const wss = new websocket.Server({ server });

wss.sendViewers = function broadcast(to, data) {
  wss.clients.forEach(client => {
    if (
      client.readyState === websocket.OPEN &&
      client.player &&
      client.player === to
    ) {
      client.send(data);
    }
  });
};

const isJSON = str => {
  let j = false;
  try {
    j = JSON.parse(str);
  } catch (err) {
    j = false;
  }
  return j;
};

wss.on('connection', ws => {
  ws.on('message', async message => {
    const json = isJSON(message);
    if (json) {
      const { type, player } = json;
      if (type === 'ping') {
        ws.send(JSON.stringify({ type: 'pong' }));
        return;
      } else if (type === 'html') {
        wss.sendViewers(player, JSON.stringify(json));
        return;
      } else if (type === 'view') {
        ws.player = player;
        return;
      }
    } else if (message === 'ping') {
      ws.send('pong');
      return;
    }
    ws.send(JSON.stringify({ error: 'command not found' }));
  });
});

server.listen(port);

server.on('error', error => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});
server.on('listening', () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  console.log(`Listening on ${bind}`);
});
