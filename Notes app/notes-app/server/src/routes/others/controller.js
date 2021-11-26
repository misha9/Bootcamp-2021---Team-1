const pool = require("../../../dbService");

const getWorkspace = (req, res) => {
  let result = [];
  console.log("For workspace", req.body.user_id);
  pool.query(
    "select * from workspace where u_id = $1",
    [req.body.user_id],
    (error, results) => {
      if (results.rows.length == 0) {
        console.log("New");
        pool.query(
          "call set_workspace($1)",
          [req.body.user_id],
          (error, results) => {
            pool.query(
              "select * from workspace where u_id = $1",
              [req.body.user_id],
              (error, results) => {
                console.log(results.rows, "middle");
                if (error) throw error;
                result.push({ result: results.rows });
                console.log(result, "res");
                res.status(200).json(result);
              }
            );
            if (error) throw error;
          }
        );
      } else {
        result.push({ result: results.rows });
        console.log(results.rows);
        console.log(result, "last");
        res.status(200).json(result);
      }
      if (error) throw error;
    }
  );
};

const getRecent = (req, res) => {
  console.log(req.body.wsID, "In recent");
  pool.query(
    "SELECT * FROM prev where unique_id = $1 ORDER BY updated_date LIMIT 10",
    [req.body.wsID],
    (error, results) => {
      if (error) throw error;
      res.status(200).json(results.rows);
    }
  );
};

module.exports = { getRecent, getWorkspace };
