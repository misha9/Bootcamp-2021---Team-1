const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "psq@1450",
  database: "Notes-application",
  host: "localhost",
  port: 5432,
});

module.exports = pool;
