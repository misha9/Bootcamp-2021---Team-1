const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "psq@1450",
  database: "NotesApp_v1",
  host: "localhost",
  port: 5432,
});

module.exports = pool;
