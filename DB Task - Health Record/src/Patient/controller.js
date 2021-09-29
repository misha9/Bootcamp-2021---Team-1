const pool = require('../../dbService');
const queries = require('./queries');

const getPatients = (req, res) =>{
    // (error, results) =>{} is a callback fn
    pool.query(queries.getPatients, (error, results)=>{
        if(error) throw error; //if there is an error
        res.status(200).json(results.rows);   //if it was a successful query then have to send back the json of all patients
    })
}

const getPatientById = (req, res) => {
    const id = parseInt(req.params.p_id);
    pool.query(queries.getPatientById, [id], (error, results)=>{
        if(error) throw error;
        res.status(200).json(results.rows);
    })
}

const addPatient = (req, res) => {
    const {p_name, user_id, age, blood_group, p_address, h_id, p_id} = req.body;
    pool.query(queries.addPatient, [p_name, user_id, age, blood_group, p_address, h_id, p_id], (error, results) => {
        if(error) throw error;
        res.status(200).send("Patient added successfully");
        console.log("Patient added");
    })
}

//exporting as an object because there is going to be multiple of these functions
module.exports = {
    getPatients,
    getPatientById, 
    addPatient,
}
