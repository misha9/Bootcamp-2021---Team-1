const pool = require("../../../dbService");

const addBookmark = (req, res) => {
  console.log(req.body.id, req.body.flag);

  pool.query(
    "update note set bookmark = $1 where n_id = $2",
    [req.body.flag, req.body.id],
    (error, results) => {
      if (error) throw error;
      res.status(200).send("SUCCESS");
      console.log("Bookmarked the note successfully");
    }
  );
};

const getBookmark = (req, res) => {
  pool.query(
    "select * from prev where bookmark = $1 ",
    [true],
    (error, results) => {
      if (error) throw error;
      res.status(200).json(results.rows);
    }
  );
};

module.exports = { addBookmark, getBookmark };
