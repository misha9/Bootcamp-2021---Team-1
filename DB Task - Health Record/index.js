const express = require('express');
const patientRoutes = require('./src/Patient/routes');
const billRoutes = require('./src/Bill/routes');
const recordRoutes = require('./src/Record/routes');

const app = express();
const pool = require("./dbService");

app.use(express.json());   //allows us to post and get json from our endpoints

app.get('/', (req, res)=>{
    res.send("Hey");
    console.log("I am here");
})


//Routes
app.use('/api/v1/patients', patientRoutes);
app.use('/api/v1/bills', billRoutes);
app.use('/api/v1/record', recordRoutes);


app.listen(3000, ()=>{
    console.log('Server is listening on the port 3000')
})