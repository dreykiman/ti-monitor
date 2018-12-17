import mongodb from 'mongodb'

const insert = (pair, data) => {
  mongodb.MongoClient.connect("mongodb://localhost:27017/binance", (err, db) => {
    let dbo = db.db("trades")
    if (Array.isArray(data))
      dbo.collection(pair).insertMany(data)
    else
      dbo.collection(pair).insertOne(data)
  })
}

const read = (pair) => {
  return new Promise((resolve, reject) => {
    mongodb.MongoClient.connect("mongodb://localhost:27017/binance", (err, db) => {
      let dbo = db.db("trades")
      dbo.collection(pair).find({}).toArray((err, res) => {
        resolve(res)
        db.close()
      })
    })
  })
}

export default {insert, read}
