const connect = () => {
  const ws = new window.WebSocket(url);
  ws.addEventListener('open', function(event) {
    ws.send(JSON.stringify({ token }));
  });

  ws.addEventListener('close', () => {
    ws.close();
    setTimeout(() => connect(), 2000);
  });
  return ws;
};

export default connect;
