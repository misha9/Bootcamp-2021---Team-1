const pool = require('../../dbService');
const queries = require('./queries');

const getQuery = (req, res) =>{
    pool.query(queries.getQuery, (error, results)=>{
        if(error) throw error; 
        res.status(200).json(results.rows);  
    })
}

module.exports = {
    getQuery,
}