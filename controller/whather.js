const Weather = require('../models/weathre')
const User = require('../models/user')

const request = require('request')
const getWeather = async (req, res) => {
    let currentWeather = await getCurrentWeather(req, res)

    currentWeather = JSON.parse(currentWeather)
    let theWeather = new Weather();
    theWeather.temp = currentWeather.main.temp
    theWeather.feels_like = currentWeather.main.feels_like
    theWeather.temp_min = currentWeather.main.temp_min
    theWeather.temp_max = currentWeather.main.temp_max
    theWeather.wind.speed = currentWeather.wind.speed
    theWeather.wind.deg = currentWeather.wind.deg
    theWeather.wind.gust = currentWeather.wind.gust
    theWeather.userId = req.params.id
    await User.findByIdAndUpdate({ _id: req.params.id }, { $push: { 'whetherList': theWeather._id } })
    theWeather.save().then(weather => {
        res.status(200).send(weather)

    }).catch(err => {
        res.status(404).send(err)
    })


}


const getUserHistory = async (req, res) => {
    try {
        const user = await User.findById({ _id: req.params.id }).populate('whetherList')
        res.status(200).json({ history: user.whetherList })
    }
    catch {
        res.status(400).send("cant find history- error")
    }

}

const deleteFromHistory = async (req, res) => {
    const weather = await Weather.findById({ _id: req.params.weatherId })
    try {
        await User.findByIdAndUpdate({ _id: req.params.id }, { $pull: { 'whetherList': weather._id } })
        await Weather.findByIdAndDelete({ _id: req.params.weatherId })
        res.status(200).send("delete succsfull!")
    }
    catch {
        res.status(400).send("cant delete")
    }


}
getCurrentWeather = (req, res) => {
    return new Promise((resolve, reject) => {
        const url = "http://api.openweathermap.org//data/2.5/weather?q=" + req.params.city + "&appid=b0e198ad305803c48cc8be22f19baece"
        request(url, function (error, response, body) {
            if (error)
                reject(error)
            else
                resolve(body)

        })
    })

}
module.exports = { getWeather, getUserHistory, deleteFromHistory }