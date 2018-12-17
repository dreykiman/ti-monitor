import WebSocket from 'ws'

function noop() {}
function heartbeat() {
  this.isAlive = true
}
 
const wss = new WebSocket.Server({ port: 8080 })
 
wss.on('connection', ws => {
  ws.isAlive = true
  ws.on('pong', heartbeat)

  ws.on('message', msg => {
    console.log('received: %s', msg)
  })
 
//  ws.send('from server to client with love');
})

const interval = setInterval(() => {
  wss.clients.forEach(ws => {
    if (ws.isAlive === false) return ws.terminate()

    ws.isAlive = false
    ws.ping(noop)
  })
}, 60000)

export default wss.clients
