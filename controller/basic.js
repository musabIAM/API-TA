const xlsx = require('xlsx');
const app = require('../database/connect.js').app
const firebase = require('../database/connect.js').fb

const database = firebase.getDatabase(app);
const rootRef = firebase.ref(database);


exports.getSoil = async function(req, res){
    firebase.get(rootRef)
    .then((snapshot) => {
        if (snapshot.exists()) {
            return res.json({ success: true, data: snapshot.val().SOIL })
        } else {
            return res.json({ success: false, data: 'No data available.' })
        }
    })
    .catch((error) => {
        return res.json({ success: false, data: error })
    });
}

exports.getHistorySoil = async function(req, res){

    const id = req.body.id
    console.log(req.body) 
    firebase.get(rootRef)
    .then((snapshot) => {
        if (snapshot.exists()) {
            return res.json({ success: true, data: data.HISTORY.SOIL[id]})
        } else {
            return res.json({ success: false, data: 'No data available.' })
        }
    })
    .catch((error) => {
        return res.json({ success: false, data: error })
    });
}
exports.getHistoryWeather = async function (req, res) {
    const id = req.body.id;
    console.log(req.body);
    firebase
      .get(rootRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          return res.json({
            success: true,
            data: data.HISTORY.WEATHER[id],
          });
        } else {
          return res.json({ success: false, data: "No data available." });
        }
      })
      .catch((error) => {
        return res.json({ success: false, data: error });
      });
  };
exports.forecast = async function(req, res){

    try {
        const workbook = xlsx.readFile('./forecast_weather.xlsx')
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        const weather_forecast = xlsx.utils.sheet_to_json(worksheet)
    
        const today = new Date()
        const week = new Date()
        week.setDate(today.getDate() + 7);
    
        var data_forecast = weather_forecast.filter(row => {
            const rowDate = new Date(row.year, row.month - 1, row.day)
            return rowDate >= today && rowDate <= week
          })
        
        var weather_type = data_forecast.map(row => row.weather_main)
        const perday = week_to_days(weather_type);

        return res.json({ success: true, data: perday})
      
    } catch (error) {
        return res.json({ success: false, data: error })
    }
}

const reshape = (array, rows, cols) => {
    if (array.length !== rows * cols) {
    throw new Error('Salah');
    }

    const reshaped = [];
    for (let i = 0; i < rows; i++) {
    reshaped.push(array.slice(i * cols, (i + 1) * cols));
    }

    return reshaped;
};

const count_data = (array) => {
    const counts = {};
    array.forEach(value => {
    counts[value] = (counts[value] || 0) + 1;
    });
    return counts;
};

const mods = (counts) => {
    return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
};

const week_to_days = (data) => {
    const rows = 7;
    const cols = 24;

    const reshapedData = reshape(data, rows, cols);

    const transformedData = new Array(rows).fill(0);

    reshapedData.forEach((subarray, i) => {
    const counts = count_data(subarray);

    if (counts[2]) {
        transformedData[i] = 2;
    } else {
        transformedData[i] = Number(mods(counts));
    }
    });

    return transformedData;
};
  
