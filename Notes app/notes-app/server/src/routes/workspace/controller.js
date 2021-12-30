const pool = require('../../../dbService');

const getWorkspace = (req, res) => {
	pool.query(
		'select * from workspace where u_id=$1 ORDER BY ws_id ASC',
		[req.body.uID],
		(error, results) => {
			if (error) throw error;
			res.status(200).json(results.rows);
		}
	);
};

const addWorkspace = (req, res) => {
	pool.query(
		'INSERT INTO workspace (u_id, name, icon) VALUES ($1, $2, $3)',
		[req.body.uID, req.body.name, req.body.icon],
		(error, results) => {
			if (error) throw error;
			res.status(200).send('Workspace added successfully');
		}
	);
};

const renameWorkspace = (req, res) => {
	pool.query(
		'UPDATE workspace SET name = $1, icon = $2 WHERE ws_id=$3',
		[req.body.name, req.body.icon, req.body.wsID],
		(error, results) => {
			if (error) throw error;
			res.status(200).send('workspace name updated successfully');
		}
	);
};

const deleteWorkspace = (req, res) => {
	const id = req.body.wsID;
	pool.query('CALL delete_workspace($1)', [id], (error, results) => {
		if (error) throw error;
		res.status(200).json(results.rows);
	});
};

// const renameNotebook = (req, res) => {
//   console.log(req.body, "rename nb ID");
//   pool.query(
//     "UPDATE notebook SET name = $1 WHERE nb_id=$2",
//     [req.body.name, req.body.nbID],
//     (error, results) => {
//       if (error) throw error;
//       res.status(200).send("notebook name updated successfully");
//       console.log("renamed the notebook");
//     }
//   );
// };

module.exports = {
	addWorkspace,
	getWorkspace,
	renameWorkspace,
	deleteWorkspace,
};
