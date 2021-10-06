const pool = require('../../dbService');
const queries = require('./queries');

const getQuery1 = (req, res) =>{
    pool.query(queries.getQuery1, (error, results)=>{
        if(error) throw error; 
        res.status(200).json(results.rows);  
    })
}

const getQuery2 = (req, res) =>{
    pool.query(queries.getQuery2, (error, results)=>{
        if(error) throw error; 
        res.status(200).json(results.rows);  
    })
}

const getQuery3 = (req, res) =>{
    pool.query(queries.getQuery3, (error, results)=>{
        if(error) throw error; 
        res.status(200).json(results.rows);  
    })
}

const getQuery4 = (req, res) =>{
    pool.query(queries.getQuery4, (error, results)=>{
        if(error) throw error; 
        res.status(200).json(results.rows);  
    })
}

const getQuery5 = (req, res) =>{
    pool.query(queries.getQuery5, (error, results)=>{
        if(error) throw error; 
        res.status(200).json(results.rows);  
    })
}

module.exports = {
    getQuery1, getQuery2, getQuery3, getQuery4, getQuery5 
}