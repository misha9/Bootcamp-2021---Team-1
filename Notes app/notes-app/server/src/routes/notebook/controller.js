const pool = require("../../../dbService");

const getNotebooks = (req, res) => {
  console.log("For work notebooks", req.body);
  pool.query(
    "select * from notebook where ws_id=$1 ORDER BY nb_id DESC",
    [req.body.ws_id],
    (error, results) => {
      if (error) throw error;
      console.log(results.rows);
      res.status(200).json(results.rows);
    }
  );
};

const addNotebook = (req, res) => {
  console.log("adding notebook");
  pool.query(
    "INSERT INTO notebook (name, nb_date, ws_id) VALUES ($1, $2, $3)",
    [req.body.name, req.body.date, req.body.ws_id],
    (error, results) => {
      if (error) throw error;
      res.status(200).send("Notebook added successfully");
      console.log("Notebook added");
    }
  );
};

const deleteNotebook = (req, res) => {
  console.log(req.body, "delete-body");
  const id = req.body.nbID;
  console.log(id);
  pool.query("CALL delete_notebook($1)", [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
    console.log("Deleted a notebook");
  });
};

const renameNotebook = (req, res) => {
  console.log(req.body, "rename nb ID");
  pool.query(
    "UPDATE notebook SET name = $1 WHERE nb_id=$2",
    [req.body.name, req.body.nbID],
    (error, results) => {
      if (error) throw error;
      res.status(200).send("notebook name updated successfully");
      console.log("renamed the notebook");
    }
  );
};

module.exports = { getNotebooks, addNotebook, deleteNotebook, renameNotebook };
