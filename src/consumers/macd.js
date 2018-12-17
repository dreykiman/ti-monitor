export default class MACD {
  constructor() {
  }

  feed(ledger) {
    let now = ledger.slice(-1)[0].time
    let closingPrices = ledger.reduce( (cprices, trd) => {
      let ind = Math.floor((now-trd.time)/60000)
      cprices[ind] = trd.price
      return cprices
    }, [])

    let maIndices = [5,10,12,20,26]
    maIndices.forEach( maIndex => {
      this['sma'+maIndex] = closingPrices.slice(0,maIndex).reduce( (a,b) => Number(a)+Number(b) )/maIndex
      
    })
  }
}

