const Pool = require('pg').Pool;

const pool = new Pool({
	user: 'postgres',
	password: 'password',
	database: 'notesapp_v1',
	host: 'localhost',
	port: 5432,
});

module.exports = pool;
