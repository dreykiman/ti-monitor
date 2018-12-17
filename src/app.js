import wsclients from './connection/server'
import producers from './producers'
import consumers from './consumers'

let macd = new consumers.MACD()

let binance = new producers.Binance(['ETHBTC'])
binance.ready.then( () => {
  binance.add_consumer(macd)

  setInterval( () => {
    wsclients.forEach( cli => {
      let inp = {}
      let maIndices = [5,10,12,20,26]
      maIndices.forEach(maIndex => inp['sma'+maIndex] = macd['sma'+maIndex])
      cli.send(JSON.stringify(inp))
    })
  }, 3000)
})


