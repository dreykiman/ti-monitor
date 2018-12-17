export default class MACD {
  constructor() {
  }

  feed(ledger) {
    let now = ledger.slice(-1)[0].time
    let sma = ledger.reduce( (sma, trd) => {
      let ind = Math.floor((now-trd.time)/60000)
      sma[ind] = trd.price
      return sma
    }, [])

    let maIndices = [5,10,12,20,26]
    maIndices.forEach( maIndex => this['ma'+maIndex] = sma.slice(-maIndex).reduce( (a,b) => Number(a)+Number(b) )/maIndex )
  }
}

