const pool = require("../../../dbService");

const getWorkspace = (req, res) => {
  pool.query("select * from workspace", (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getRecent = (req, res) => {
  pool.query(
    "SELECT * FROM prev ORDER BY n_id DESC LIMIT 5 ",
    (error, results) => {
      if (error) throw error;
      res.status(200).json(results.rows);
    }
  );
};

module.exports = { getWorkspace, getRecent };
