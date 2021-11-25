const pool = require("../../../dbService");

const addTag = (req, res) => {
  console.log(req.body);
  pool.query(
    "INSERT INTO tag (name) VALUES ($1)",
    [req.body.tag_name],
    (error, results) => {
      if (error) throw error;
      res.status(200).send("Tag added successfully");
      console.log("tag added");
    }
  );
};

module.exports = { addTag };
