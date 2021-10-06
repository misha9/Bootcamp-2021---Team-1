const pool = require('../../dbService');
const queries = require('./queries');

const getRecords = (req, res) =>{
    pool.query(queries.getRecords, (error, results)=>{
        if(error) throw error; 
        res.status(200).json(results.rows); 
    })
}

const addRecord = (req, res) => {
    const {p_id, h_id, doctor_id, service_id, amount, consultation_date} = req.query;
    pool.query(queries.addRecord, [p_id, h_id, doctor_id, service_id, amount, consultation_date], (error, results) => {
        if(error) throw error;
        res.status(200).send("Patient added successfully");
        console.log("Patient added");
    })
}

module.exports = {
    getRecords,
    addRecord,
}