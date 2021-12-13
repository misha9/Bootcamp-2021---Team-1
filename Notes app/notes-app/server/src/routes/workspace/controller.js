const pool = require("../../../dbService");

const getWorkspace = (req, res) => {
  console.log("For work notebooks", req.body.uID);
  pool.query(
    "select * from workspace where u_id=$1 ORDER BY ws_id ASC",
    [req.body.uID],
    (error, results) => {
      if (error) throw error;
      console.log(results.rows);
      res.status(200).json(results.rows);
    }
  );
};

const addWorkspace = (req, res) => {
  console.log("adding workspace", req.body);
  pool.query(
    "INSERT INTO workspace (u_id, name, icon) VALUES ($1, $2, $3)",
    [req.body.uID, req.body.name, req.body.icon],
    (error, results) => {
      if (error) throw error;
      res.status(200).send("Workspace added successfully");
      console.log("Workspace added");
    }
  );
};

const renameWorkspace = (req, res) => {
  console.log(req.body, "rename workspace");
  pool.query(
    "UPDATE workspace SET name = $1 WHERE ws_id=$2",
    [req.body.name, req.body.wsID],
    (error, results) => {
      if (error) throw error;
      res.status(200).send("workspace name updated successfully");
      console.log("renamed the workspace");
    }
  );
};

const deleteWorkspace = (req, res) => {
  console.log(req.body, "delete-body");
  const id = req.body.wsID;
  console.log(id);
  pool.query("CALL delete_workspace($1)", [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
    console.log("Deleted workspace");
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
