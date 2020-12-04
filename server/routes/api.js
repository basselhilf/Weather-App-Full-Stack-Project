const express = require('express')
const router = express.Router()
const request = require('request')
const City = require('../model/City')
const moment = require('moment')
const { json } = require('body-parser')
require('dotenv').config()


router.get('/city/:cityName',function(req,res){
    const city=req.params.cityName
   request(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.WEATHER_API_KEY}`,
function (err,response){
    let data=JSON.parse(response.body)
    if(data.cod===200){
        data={
            name:data.name,
            temperature:Math.round(data.main.temp),
            condition:data.weather[0].description,
            conditionPic:data.weather[0].icon,
            cod:data.cod
        }
        res.send(data)
    }else{
        res.send(data)
    }
})
   })



router.get('/cities',function(req,res){
    City.find({},function(err,cities){
        res.send(cities)
    })
})

router.post('/city',async function(req,res){
    let data = req.body
    let city = await City.findOne({name:data.name})
    if(city){
        res.end()
    }else{
        let newCity = new City({
            name:data.name,
            temperature:data.temperature,
            condition:data.condition,
            conditionPic:data.conditionPic
        })
        newCity.save()
        res.end()
    }
})

router.delete('/city/:cityName', function (req, res) {
    const cityName = req.params.cityName;
    City.findOneAndDelete({ name: cityName }, function () {
      res.end()
    })
  })
  
module.exports=router