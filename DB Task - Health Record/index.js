const express = require('express');
const patientRoutes = require('./src/Patient/routes');
const billRoutes = require('./src/Bill/routes');
const recordRoutes = require('./src/Record/routes');
const queryRoutes = require('./src/Queries/routes');
// const testRoutes = require('./src/Test/routes');

const app = express();
const pool = require("./dbService");

//allows us to post and get json from our endpoints
app.use(express.json({limit: '500mb'}));


//Routes
app.use('/api/v1/patients', patientRoutes);
app.use('/api/v1/bills', billRoutes);
app.use('/api/v1/record', recordRoutes);
app.use('/api/v1/query', queryRoutes);


app.post('/api/v1/test', (req, res) =>{
    const t1 = new Date();
    const data = req.body;

    let status;
    
    for (let i = 0; i < data.length; i++) {
        pool.query("INSERT INTO Lab (lab_test_date) VALUES ($1)", [data[i].lab_test_date], (error, results) => {
            if(error) throw error;
        })
        status = i;
    }

    console.log(data.length);

    if (status === data.length-1) {
        res.status(200).send("Data added successfully");
        console.log("Data added");
    }

    const t2 = new Date();
    const et = t2 - t1;
    console.log(t1, t2, et);
});


app.listen(3000, ()=>{
    console.log('Server is listening on the port 3000')
})