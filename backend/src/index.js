const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
var cors = require('cors')
require('dotenv').config()
const port = 8080

var corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(bodyParser.json())
app.use(cors(corsOptions))
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.options('*', cors(corsOptions))

app.get('/ping', (request, response) => {
  response.send("pong")
})

app.get('/api/texts', db.getTexts)
app.get('/api/texts/get', db.getTextById)
app.post('/api/texts/create', db.createText)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})