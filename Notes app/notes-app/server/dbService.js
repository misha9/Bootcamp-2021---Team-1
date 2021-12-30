const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "pass@456",
  database: "Notes_V1",
  host: "localhost",
  port: 5432,
});

module.exports = pool;
