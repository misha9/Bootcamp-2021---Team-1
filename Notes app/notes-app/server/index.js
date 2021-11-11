const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());

const pool = require("./dbService");

//allows us to post and get json from our endpoints
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());

// app.use(express.json());


app.patch('/api/get-notes', (req, res) =>{
    // (error, results) =>{} is a callback fn
    console.log(req.body.notebook_id, 'notebook id comes')
    pool.query("select * from prev where nb_id=$1 ORDER BY n_id DESC", [req.body.notebook_id], (error, results)=>{
        if(error) throw error; //if there is an error
        res.status(200).json(results.rows);   //if it was a successful query then have to send back the json of all patients
    })
})

app.patch('/api/get-full-text', (req, res) =>{
    // (error, results) =>{} is a callback fn
    console.log('In  get full-text')
    console.log(req.body, 'body')
    const id = (req.body.note_id);
    pool.query("select note_content from note1 where n_id = $1", [id],  (error, results)=>{
        if(error) throw error; //if there is an error
        res.status(200).json(results.rows);   //if it was a successful query then have to send back the json of all patients
        console.log(results.rows);
        console.log('Got full text')
    })
})

app.post('/api/add-notes', (req, res) => {
    console.log(req.body, 'body');
    pool.query("INSERT INTO note1 (note_content, note_date, nb_id, ws_id) VALUES ($1, $2, $3, $4)", [req.body.note_content, req.body.note_date, req.body.nb_id, req.body.ws_id], (error, results) => {
        if(error) throw error;
        res.status(200).send("Note added successfully");
        console.log("Note added");
    })
})

app.post('/api/delete-notes', (req, res) => {
    console.log(req.body, 'delete-body');
    const id = req.body.id;
    console.log(id);
    pool.query("delete from note1 where n_id = $1", [id], (error, results)=>{
        if(error) throw error;
        res.status(200).json(results.rows);
        console.log("Deleted a note");
    })
})

// app.post('/api/registration', async (req, res) => {
//     let email=req.body.reg 
//     let password=req.body.pas
//     let password2=req.body.cpas
//     let errors = [];
//     console.log({
//      email,
//      password,
//      password2 
//     });
  
//       hashedPassword = await bcrypt.hash(password, 10);
//       console.log(hashedPassword);

//             pool.query(
//                 `SELECT * FROM USERS WHERE username =$1"`,
//                 [email],
//                 (err, results) => {
//                 if (err) {
//                 //     throw err;
//                 // }
//                 // if (res.rows.length =0){
//                     pool.query(
//                         `INSERT INTO users (username, psw)
//                             VALUES ($1, $2)`,
//                         [email, hashedPassword],
//                         (err, results) => {
//                           if (err) {
//                             throw err;
//                           }
//                           console.log("success_msg", "You are now registered. Please log in");
//                           res.send("true");
//                           //   res.redirect("/login/Login.js");
//                         }
//                       );
//                 }
//              }

//             );             
//           } 
//       );

app.patch('/api/get-notebooks', (req, res) =>{
// (error, results) =>{} is a callback fn
    console.log("For work notebooks", req.body.ws_id)
    pool.query("select * from notebook where ws_id=$1 ORDER BY nb_id DESC", [req.body.ws_id], (error, results)=>{
        if(error) throw error; //if there is an error
        console.log(results.rows);
        res.status(200).json(results.rows);   //if it was a successful query then have to send back the json of all patients
    })
})

app.post('/api/add-notebook', (req, res) =>{
    pool.query("INSERT INTO notebook (name, ws_id) VALUES ($1, $2)", [req.body.name, req.body.ws_id], (error, results) => {
        if(error) throw error;
        res.status(200).send("Notebook added successfully");
        console.log("Notebook added");
    })
})

app.post('/api/delete-notebook', (req, res) => {
    console.log(req.body, 'delete-body');
    const id = req.body.nbID;
    console.log(id);
    pool.query("CALL delete_notebook($1)", [id], (error, results)=>{
        if(error) throw error;
        res.status(200).json(results.rows);
        console.log("Deleted a notebook");
    })
})

app.get('/api/get-workspace', (req, res) =>{
    // (error, results) =>{} is a callback fn
        pool.query("select * from workspace", (error, results)=>{
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