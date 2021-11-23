const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "Stardust*09",
  database: "notes1811",
  host: "localhost",
  port: 5432,
});

module.exports = pool;
