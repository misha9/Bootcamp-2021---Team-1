const Pool = require('pg').Pool;


const pool = new Pool({
    user: "postgres",
    password: "psq@1450",
    database: "Health Record",
    host: "localhost",
    port: 5432
}); 

// pool.connect((err) => {
//     if (err) {
//       console.log(err.message);
//     }
//     console.log("db " + pool.);
//   });


module.exports = pool;