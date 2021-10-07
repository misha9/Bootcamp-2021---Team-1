const pool = require('../../dbService');
const queries = require('./queries');

const getBills = (req, res) =>{
    pool.query(queries.getBills, (error, results)=>{
        if(error) throw error;
        res.status(200).json(results.rows); 
    })
}

const addBill = (req, res) => {
    const {amount, b_date} = req.query;
    pool.query(queries.addBill, [amount, b_date], (error, results) => {
        if(error) throw error;
        res.status(200).send("Patient added successfully");
        console.log("Patient added");
    })
}

module.exports = {
    getBills,
    addBill,
}