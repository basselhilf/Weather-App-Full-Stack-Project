const express = require('express')
const bodyParser = require(`body-parser`)
const api = require(`./server/routes/api`)
const mongoose = require('mongoose')
const path = require('path')
const app = express()
require('dotenv').config('.env')

app.use(express.static(path.join(__dirname,'dist')))
app.use(express.static(path.join(__dirname,'node_modules')))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))


mongoose.connect('mongodb://localhost/weatherDB',{useNewUrlParser:true})

app.use('/',api)

// const port=PORT
app.listen(process.env.PORT,function(){
    console.log(`Running server on port : ${process.env.PORT}`)
})