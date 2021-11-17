const Pool = require('pg').Pool;


const pool = new Pool({
    user: "postgres",
    password: "post123",
    database: "notestest",
    host: "localhost",
    port: 5432
}); 


module.exports = pool;
