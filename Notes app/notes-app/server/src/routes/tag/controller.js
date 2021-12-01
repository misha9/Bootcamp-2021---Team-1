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

const getTagName = (req, res) => {
  console.log("request for tags", req.body);
  pool.query(
    "SELECT name FROM tag INNER JOIN tag_note ON tag.t_id = tag_note.t_id INNER JOIN note ON tag_note.n_id = note.n_id where tag_note.n_id=$1",
    [req.body.note_id],
    (error, results) => {
      if (error) throw error;
      res.status(200).json(results.rows);
    }
  );
};

module.exports = { addTag, getTagName };
