import express from 'express'

let app = express()
app.use(express.static('public'))

app.listen(5000, () => console.log('App listening on port 5000') )

