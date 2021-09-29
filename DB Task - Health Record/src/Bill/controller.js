const pool = require('../../dbService');
const queries = require('./queries');

const getBills = (req, res) =>{
    pool.query(queries.getBills, (error, results)=>{
        if(error) throw error;
        res.status(200).json(results.rows); 
    })
}

const addBill = (req, res) => {
    const data = req.body;
    
    const obj = data.map(i => {
        pool.query(queries.addBill, [i.amount, i.b_date], (error, results) => {
            if(error) throw error;
        })
    })
    if (obj) {
        res.status(200).send("Bill added successfully");
        console.log("Bill added");
    }
}

module.exports = {
    getBills,
    addBill,
}