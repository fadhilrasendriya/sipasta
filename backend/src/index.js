const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/ping', (request, response) => {
  response.send("pong")
})

app.get('/api/texts', db.getTexts)
app.get('/api/texts/get', db.getTextById)
app.post('/api/texts/create', db.createText)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})