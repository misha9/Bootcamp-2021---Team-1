const pool = require('../../../dbService');

const getNotebooks = (req, res) => {
	pool.query(
		'select * from notebook where ws_id=$1 ORDER BY nb_id DESC',
		[req.body.ws_id],
		(error, results) => {
			if (error) throw error;
			res.status(200).json(results.rows);
		}
	);
};

const addNotebook = (req, res) => {
	pool.query(
		'INSERT INTO notebook (name, nb_date, ws_id) VALUES ($1, $2, $3)',
		[req.body.name, req.body.date, req.body.ws_id],
		(error, results) => {
			if (error) throw error;
			res.status(200).send('Notebook added successfully');
		}
	);
};

const deleteNotebook = (req, res) => {
	const id = req.body.nbID;
	pool.query('CALL delete_notebook($1)', [id], (error, results) => {
		if (error) throw error;
		res.status(200).json(results.rows);
	});
};

const renameNotebook = (req, res) => {
	pool.query(
		'UPDATE notebook SET name = $1 WHERE nb_id=$2',
		[req.body.name, req.body.nbID],
		(error, results) => {
			if (error) throw error;
			res.status(200).send('notebook name updated successfully');
		}
	);
};

module.exports = { getNotebooks, addNotebook, deleteNotebook, renameNotebook };
