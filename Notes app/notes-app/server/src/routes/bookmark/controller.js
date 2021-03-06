const pool = require('../../../dbService');

const addBookmark = (req, res) => {
	pool.query(
		'update note set bookmark = $1 where n_id = $2',
		[req.body.flag, req.body.id],
		(error, results) => {
			if (error) throw error;
			res.status(200).send('SUCCESS');
		}
	);
};

const getBookmark = (req, res) => {
	pool.query(
		'select * from prev where bookmark = $1 AND ws_id = $2 ORDER by updated_date DESC',
		[true, req.body.wsID],
		(error, results) => {
			if (error) throw error;
			res.status(200).json(results.rows);
		}
	);
};

module.exports = { addBookmark, getBookmark };
