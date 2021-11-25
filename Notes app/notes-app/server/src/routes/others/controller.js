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
      // res.status(200).json(result);
      // res.status(200).json(results.rows);
    }
  );
};

// const setWorkspace = (req, res) => {
//   console.log("For workspace", req.body.user_id);
//   pool.query(
//     "call set_workspace($1) WHERE NOT EXISTS (SELECT * FROM workspace WHERE user_id = $1)",
//     [req.body.user_id],
//     (error, results) => {
//       if (error) throw error;
//       res.status(200).json(results.rows);
//     }
//   );
// };

const getRecent = (req, res) => {
  pool.query(
    "SELECT * FROM prev ORDER BY updated_date DESC LIMIT 10 ",
    (error, results) => {
      if (error) throw error;
      res.status(200).json(results.rows);
    }
  );
};

module.exports = { getRecent, getWorkspace };
