var express = require('express')
var router = express.Router()

var basicControler = require('../controller/basic')

router.get('/tampil_soil',basicControler.getSoil)
router.get('/tampil_history_soil',basicControler.getHistorySoil)

module.exports = router;

