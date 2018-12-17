export default class MACD {
  constructor() {
    this.dict = {}
  }

  feed(ledger) {
    let now = ledger.slice(-1)[0].time
    let closingPrices = ledger.reduce( (cprices, trd) => {
      let ind = Math.floor((now-trd.time)/60000)
      cprices[ind] = trd.price
      return cprices
    }, [])

    let dict = this.dict
    let maIndices = [5,10,12,20,26]
    maIndices.forEach( maIndex => {
      dict['sma'+maIndex] = closingPrices.slice(0,maIndex).reduce( (a,b) => Number(a)+Number(b) ) / maIndex

      let startIndex = closingPrices.length - maIndex
      let ema = closingPrices.slice(-maIndex).reduce( (a,b) => Number(a)+Number(b) ) / maIndex
      while(startIndex >= 0) {
        ema = (closingPrices[startIndex] - ema) * 2 / (maIndex + 1) + ema
        startIndex--
      }
      dict['ema'+maIndex] = ema
    })

    dict.macd = dict.ema26 - dict.ema12
  }

  output() {
    return this.dict
  }
}

