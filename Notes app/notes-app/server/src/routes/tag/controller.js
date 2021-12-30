const pool = require('../../../dbService');

const addTag = (req, res) => {
	pool.query(
		'INSERT INTO tag (name) VALUES ($1)',
		[req.body.tag_name],
		(error, results) => {
			if (error) throw error;
			res.status(200).send('Tag added successfully');
		}
	);
};

const getTagName = (req, res) => {
	pool.query(
		'SELECT t_name FROM tag where n_id=$1',
		[req.body.note_id],
		(error, results) => {
			if (error) throw error;
			res.status(200).json(results.rows);
		}
	);
};

const getAllTags = (req, res) => {
	pool.query('SELECT t_name FROM tag', (error, results) => {
		if (error) throw error;
		res.status(200).json(results.rows);
	});
};

const getTagsCount = (req, res) => {
	let tagCount = [];
	req.body.tags.map((tag, i) => {
		pool.query(
			'select n_id from tag where $1 = any (t_name)',
			[tag],
			(error, results) => {
				if (error) throw error;
				let obj = { tagName: tag, noteIDs: results.rows };
				tagCount.push(obj);
				if (i === req.body.tags.length - 1) {
					res.status(200).json(tagCount);
				}
			}
		);
	});
};

const getTagNotes = (req, res) => {
	const notes = [];

	req.body.tags.map((tag, i) => {
		pool.query(
			'SELECT * from prev where n_id=$1',
			[tag.n_id],
			(error, results) => {
				if (error) throw error;
				notes.push(results.rows);
				if (i === req.body.tags.length - 1) {
					res.status(200).json(notes);
				}
			}
		);
	});
};

module.exports = { addTag, getTagName, getAllTags, getTagsCount, getTagNotes };
