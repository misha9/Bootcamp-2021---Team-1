const pool = require('../../dbService');
const queries = require('./queries');

const getRecords = (req, res) =>{
    pool.query(queries.getRecords, (error, results)=>{
        if(error) throw error; 
        res.status(200).json(results.rows); 
    })
}

const addRecord = (req, res) => {
    const data = req.body;

    const obj = data.map(i => {
        pool.query(queries.addRecord, [i.p_id, i.h_id, i.doctor_id, i.service_id, i.amount, i.consultation_date], (error, results) => {
            if(error) throw error;
        })
    })
    if (obj) {
        res.status(200).send("Record added successfully");
        console.log("Record added");
    }
}

module.exports = {
    getRecords,
    addRecord,
}