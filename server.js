const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const sqlApi = require('./src/model/sqlApi')
const path = require('path');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname,"./src/model" )))
app.use(express.static(path.join(__dirname, 'node_modules')))


app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
  
    next()
  })

  app.use('/', sqlApi)
 


const port = 3200
app.listen(port, function () {
    console.log(`crm Server's UP, on port ${port}`)
})