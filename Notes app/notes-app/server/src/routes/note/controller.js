const pool = require("../../../dbService");

const getNotes = (req, res) => {
  console.log(req.body.notebook_id, "notebook id comes");
  pool.query(
    "select * from prev where nb_id=$1 ORDER BY updated_date DESC",
    [req.body.notebook_id],
    (error, results) => {
      if (error) throw error;
      res.status(200).json(results.rows);
      console.log(results.rows);
    }
  );
};

const addNote = (req, res) => {
  console.log(req.body, "adding a note");
  let nID = Date.now();
  pool.query(
    "INSERT INTO note (n_id, title, note_content, note_date, nb_id, unique_id, bookmark, updated_date) VALUES ($1,$2, $3, $4, $5, $6, false, $4)",
    [
      nID,
      req.body.title,
      req.body.note_content,
      req.body.note_date,
      req.body.nb_id,
      req.body.ws_id,
    ],
    (error, results) => {
      if (error) throw error;
      console.log("Note added");
      req.body.tags.map((tag) => {
        pool.query(
          "INSERT INTO tag (t_id, name) VALUES ($1, $2)",
          [tag.id, tag.name],
          (error, results) => {
            if (error) throw error;
            console.log("tag added");
            pool.query(
              "INSERT INTO tag_note (t_id, n_id) VALUES ($1, $2)",
              [tag.id, nID],
              (error, results) => {
                if (error) throw error;
                console.log("tag added to note");
              }
            );
          }
        );
      });
      res.status(200).send("Note added successfully");
    }
  );
};

const editNote = (req, res) => {
  console.log(req.body, "Editing");
  pool.query(
    "UPDATE note SET title = $1, note_content = $2, updated_date = $3 WHERE n_id = $4",
    [
      req.body.title,
      req.body.note_content,
      req.body.update_date,
      req.body.noteID,
    ],
    (error, results) => {
      if (error) throw error;
      res.status(200).send("Note updated successfully");
      console.log("Note updated");
    }
  );
};

const deleteNote = (req, res) => {
  console.log(req.body, "delete-body");
  const id = req.body.id;
  console.log(id);
  pool.query("delete from note where n_id = $1", [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
    console.log("Deleted a note");
  });
};

const getFullText = (req, res) => {
  console.log("In  get full-text");
  console.log(req.body, "body");
  const id = req.body.note_id;
  pool.query(
    "select n_id,note_content,bookmark, title from note where n_id = $1",
    [id],
    (error, results) => {
      if (error) throw error;
      res.status(200).json(results.rows);
      console.log(results.rows);
      console.log("Got full text");
    }
  );
};

module.exports = {
  getNotes,
  addNote,
  editNote,
  deleteNote,
  getFullText,
};
