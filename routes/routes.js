var express = require('express')
var router = express.Router()

var basicControler = require('../controller/basic')

router.get('/tampil_soil',basicControler.getSoil)
router.post('/tampil_history_soil',basicControler.getHistorySoil)
router.get('/forecast',basicControler.forecast)
router.post('/tampil_history_weather',basicControler.getHistoryWeather)

module.exports = router;

