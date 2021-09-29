const pool = require('../../dbService');
const queries = require('./queries');

const getBills = (req, res) =>{
    pool.query(queries.getBills, (error, results)=>{
        if(error) throw error; //if there is an error
        res.status(200).json(results.rows);   //if it was a successful query then have to send back the json of all patients
    })
}

const addBill = (req, res) => {
    const {b_date, amount, b_id} = req.body;
    pool.query(queries.addBill, [b_date, amount, b_id], (error, results) => {
        if(error) throw error;
        res.status(200).send("Bill added successfully");
        console.log("Bill added");
    })
}

module.exports = {
    getBills,
    addBill,
}