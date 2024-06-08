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
           
            const data = snapshot.val() 
            const n = data.HISTORY.SOIL[id].n
            const p = data.HISTORY.SOIL[id].p
            const k = data.HISTORY.SOIL[id].k
            const moist = data.HISTORY.SOIL[id].moist
            const ph = data.HISTORY.SOIL[id].ph
            let status =''
            console.log(data.HISTORY.SOIL[id]) 
            if(ph<=6 || moist<0.2 || k<=250 || p<200 || n<=150){
                status = 'poor'
            }else if(ph<7.5 || moist<0.6 || k<=400 || p<350 || n<=200){
                status = 'moderate'
            }else if(ph>=7.5 || moist<=0.8 || k>400 || p>350 || n>200){
                status = 'good'
            }



            return res.json({ success: true, data: data.HISTORY.SOIL[id], stat: status})
        } else {
            return res.json({ success: false, data: 'No data available.' })
        }
    })
    .catch((error) => {
        return res.json({ success: false, data: error })
    });
}


exports.masukin = async function(req, res){
    // Add a new document with a generated ID
    
    data_fire={
        '5ddf54e0bda94d4d9c1d0da2':{

        }
    }
    firebase.set(firebase.ref(database, 'SOIL/5dcba97c0a547e1d68c9a738'),{
        long:'107.5615',
        lat:'-6.82435',
        mac_address:'3C:71:BF:2A:D7:9E',
        jenis_iot : "Sensor_SOIL_002"
    }).then(() => {
        // Data saved successfully!
        return res.json({ success: true, data: 'berhasil' })
      })
      .catch((error) => {
        // The write failed...
        return res.json({ success: false, data: error })
      });
}
