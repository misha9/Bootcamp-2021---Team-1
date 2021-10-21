const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const pool = require("./dbService");

//allows us to post and get json from our endpoints
app.use(express.json());


app.get('/api/get-notes', (req, res) =>{
    // (error, results) =>{} is a callback fn
    pool.query("select * from preview", (error, results)=>{
        if(error) throw error; //if there is an error
        res.status(200).json(results.rows);   //if it was a successful query then have to send back the json of all patients
    })
})

app.patch('/api/get-full-text', (req, res) =>{
    // (error, results) =>{} is a callback fn
    console.log('In  get full-text')
    console.log(req.body, 'body')
    const id = (req.body.note_id);
    pool.query("select note_content from notes where note_id = $1", [id],  (error, results)=>{
        if(error) throw error; //if there is an error
        res.status(200).json(results.rows);   //if it was a successful query then have to send back the json of all patients
        console.log(results.rows);
        console.log('Got full text')
    })
})

app.post('/api/add-notes', (req, res) => {
    console.log(req.body, 'body');
    const {note_id, note_content, note_date} = req.body;
    pool.query("INSERT INTO notes (note_id, note_content, note_date) VALUES ($1, $2, $3)", [note_id, note_content, note_date], (error, results) => {
        if(error) throw error;
        res.status(200).send("Note added successfully");
        console.log("Note added");
    })
})

app.post('/api/delete-notes', (req, res) => {
    console.log(req.body, 'delete-body');
    const id = req.body.id;
    console.log(id);
    pool.query("delete from notes where note_id = $1", [id], (error, results)=>{
        if(error) throw error;
        res.status(200).json(results.rows);
        console.log("Deleted a note");
    })
})

app.get('/api/v1/test', (req, res) =>{
    res.send('Hi')   
});


app.listen(5000, ()=>{
    console.log('Server is listening on the port 5000')
})