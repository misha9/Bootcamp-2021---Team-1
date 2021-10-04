const express = require('express');
const patientRoutes = require('./src/Patient/routes');
const billRoutes = require('./src/Bill/routes');
const recordRoutes = require('./src/Record/routes');
const queryRoutes = require('./src/Queries/routes');

const app = express();
const pool = require("./dbService");

//allows us to post and get json from our endpoints
app.use(express.json({limit: '500mb'}));


//Routes
app.use('/api/v1/patients', patientRoutes);
app.use('/api/v1/bills', billRoutes);
app.use('/api/v1/record', recordRoutes);
app.use('/api/v1/query', queryRoutes);


app.listen(3000, ()=>{
    console.log('Server is listening on the port 3000')
})