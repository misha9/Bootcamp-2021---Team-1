const pool = require('../../../dbService');

const getRecent = (req, res) => {
	pool.query(
		'SELECT * FROM prev where ws_id = $1 ORDER BY updated_date DESC LIMIT 10',
		[req.body.wsID],
		(error, results) => {
			if (error) throw error;
			res.status(200).json(results.rows);
		}
	);
};

const getIcons = (req, res) => {
	pool.query('SELECT * FROM icons', (error, results) => {
		if (error) throw error;
		res.status(200).json(results.rows);
	});
};

const updateIcon = (req, res) => {
	pool.query(
		'update workspace set icon = $1 where ws_id = $2',
		[req.body.icon, req.body.wsID],
		(error, results) => {
			if (error) throw error;
			res.status(200).send('Icon updated successfully');
		}
	);
};

const getToken = (req, res) => {
	try {
		res.json(true);
	} catch (err) {
		res.status(500).json('Server Error');
	}
};

module.exports = { getRecent, getToken, getIcons, updateIcon };
