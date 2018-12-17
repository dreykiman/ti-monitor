import Binance from 'binance-api-node'
import auth from '../../auth.json'

export default class {

  constructor(pairs) {
    this.client = Binance(auth)
    this.consumers = []
    this.historyLoaded = false
    let resolve
    this.ready = new Promise( (res, rej) => resolve = res )
    this.ledger = []

    // ws stream of trades (online)
    this.client.ws.trades(pairs, trd => {
      let { eventTime, price, quantity, maker } = trd
      this.ledger.push({ time: eventTime, price, qty: quantity, isBuyerMaker: maker } )

      if(!this.historyLoaded) this.loadHistory(pairs[0]).then(resolve)

      this.consumers.forEach(ele=>ele.feed(this.ledger))
    })
  }

  loadHistory(pair) {
    this.historyLoaded = true
    let period = 30*60*1000
    let history = []

    let whilst = (pars) => {
      let {symbol, fromId, fromTime} = pars

      if ((new Date().getTime() - fromTime ) > period) {
        let { eventTime, price, quantity, isBuyerMaker } = this.ledger[0]
        let ind = history.findIndex( ele => (ele.time-eventTime)<20 && ele.price===price && ele.qty===quantity )
        if (ind>-1) history.splice(ind, history.length-ind)
        this.ledger.unshift(...history)
        return Promise.resolve()
      }

      let binpars = {symbol}
      if(fromId!=null) binpars.fromId = fromId

      // trade history (REST)
      return this.client.tradesHistory(binpars)
        .then( data => {
          fromId = data[0].id-500
          fromTime = data[0].time
          console.log(new Date(fromTime).toLocaleString())

          history.unshift(...data)
          return {symbol, fromId, fromTime}
        }).then(whilst)
    }

    return whilst({ symbol: pair, fromTime: new Date().getTime() })
  }

  add_consumer(con) {
    this.consumers.push(con)
  }
}

