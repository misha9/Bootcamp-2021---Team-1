const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

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

app.post('/api/add-notes', (req, res) => {
    console.log(req.query)
    const {note_content, note_date} = req.query;
    pool.query("INSERT INTO notes (note_content, note_date) VALUES ($1, $2)", [note_content, note_date], (error, results) => {
        if(error) throw error;
        res.status(200).send("Note added successfully");
        console.log("Note added");
    })
})

app.get('/api/v1/test', (req, res) =>{
    res.send('Hi')   
});


app.listen(5000, ()=>{
    console.log('Server is listening on the port 5000')
})