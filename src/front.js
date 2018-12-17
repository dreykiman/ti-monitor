const front = () => {
  let ws = new WebSocket('ws://66.154.105.119:8080/')

  ws.addEventListener('open', msg => ws.send('from client to server'))

  ws.addEventListener('close', msg => ws.send('close'))

  ws.addEventListener('message', msg => {
    let data = JSON.parse(msg.data)
    Object.keys(data).forEach( kk => {
      document.getElementById(kk).innerHTML = Number(data[kk]).toFixed(7)
    })
    document.getElementById("updateLabel").innerHTML = new Date().toLocaleString()
    console.log('incoming: '+msg.data)
  })
}
