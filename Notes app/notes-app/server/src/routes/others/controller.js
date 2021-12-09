const pool = require("../../../dbService");

const getRecent = (req, res) => {
  console.log(req.body, "In recent");
  pool.query(
    "SELECT * FROM prev where ws_id = $1 ORDER BY updated_date DESC LIMIT 10",
    [req.body.wsID],
    (error, results) => {
      if (error) throw error;
      res.status(200).json(results.rows);
    }
  );
};

const getToken = (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Server Error");
  }
};

module.exports = { getRecent, getToken };
