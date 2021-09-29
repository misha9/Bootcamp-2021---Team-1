const pool = require('../../dbService');
const queries = require('./queries');

const getRecords = (req, res) =>{
    pool.query(queries.getRecords, (error, results)=>{
        if(error) throw error; //if there is an error
        res.status(200).json(results.rows);   //if it was a successful query then have to send back the json of all patients
    })
}

const addRecord = (req, res) => {
    const {record_id, p_name, p_id, h_name, doctor_name, consultation, test, amount, h_id, b_id, doctor_id, consultation_date} = req.body;
    pool.query(queries.addRecord, [record_id, p_name, p_id, h_name, doctor_name, consultation, test, amount, h_id, b_id, doctor_id, consultation_date], (error, results) => {
        if(error) throw error;
        res.status(200).send("Record added successfully");
        console.log("Record added");
    })
}

module.exports = {
    getRecords,
    addRecord,
}