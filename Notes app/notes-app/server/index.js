const express = require('express');

const app = express();

const pool = require("./dbService");

//allows us to post and get json from our endpoints
app.use(express.json());



app.get('/api/get-notes', (req, res) =>{
    // (error, results) =>{} is a callback fn
    pool.query("select * from notes", (error, results)=>{
        if(error) throw error; //if there is an error
        res.status(200).json(results.rows);   //if it was a successful query then have to send back the json of all patients
    })
})

app.get('/api/v1/test', (req, res) =>{
    res.send('Hi')   
});


app.listen(5000, ()=>{
    console.log('Server is listening on the port 5000')
})