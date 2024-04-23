const express = require('express')
const bodyParser = require('body-parser')
const assert = require('assert')

var config = require('./database/connect')

app = express()

cors = require('cors')

const corsTypeTwo = (req, res, next) => {
                res.header('Access-Control-Allow-Origin', '*')
                res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
                res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
                next()
              }

const coba = require('./routes/routes')

app.use(cors())
app.use(corsTypeTwo)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/router', coba)

let server = require('http').createServer()
const port = 8080

app.listen(port, function(){
    console.log('Listening on port :'+ port)
})

console.log('Conected')
