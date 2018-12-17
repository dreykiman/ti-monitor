import wsclients from './connection/server'
import producers from './producers'
import consumers from './consumers'

let macd = new consumers.MACD()

let binance = new producers.Binance(['ETHBTC'])

binance.ready.then( () => {
  binance.add_consumer(macd)

  setInterval( () => {
    wsclients.forEach( cli => {
      cli.send(JSON.stringify(macd.output()))
    })
  }, 3000)
})


