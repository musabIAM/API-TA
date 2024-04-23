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
