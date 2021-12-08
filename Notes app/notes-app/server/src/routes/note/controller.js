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
  const tagArr = [];
  // console.log(req.body.tags[0].name, "tag names");
  if (req.body.tags.length > 0) {
    for (let i = 0; i < req.body.tags.length; i++) {
      tagArr.push(req.body.tags[i].name);
    }
  }
  console.log(tagArr);
  let nID = Date.now();
  pool.query(
    "INSERT INTO note (n_id, title, note_content, note_date, nb_id, ws_id, bookmark, updated_date) VALUES ($1,$2, $3, $4, $5, $6, false, $4)",
    [
      nID,
      req.body.title,
      req.body.text,
      req.body.date,
      req.body.nbID,
      req.body.wsID,
    ],
    (error, results) => {
      if (error) throw error;
      console.log("Note added");
      pool.query(
        "INSERT INTO tag (n_id, t_name, nb_id) VALUES ($1, $2, $3)",
        [nID, tagArr, req.body.nbID],
        (error, results) => {
          if (error) throw error;
          console.log("tag added");
        }
      );
      // req.body.tags.map((tag) => {
      //   pool.query(
      //     "INSERT INTO tag (n_id, t_name) VALUES ($1, $2)",
      //     [nID, tag.name],
      //     (error, results) => {
      //       if (error) throw error;
      //       console.log("tag added");
      //     }
      //   );
      // });
      res.status(200).send("Note added successfully");
    }
  );
};

const editNote = (req, res) => {
  console.log(req.body, "Editing");
  const tagArr = [];
  for (let i = 0; i < req.body.tags.length; i++) {
    tagArr.push(req.body.tags[i].tagName);
  }
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
      pool.query(
        "UPDATE tag SET t_name = $1 where n_id=$2",
        [tagArr, req.body.noteID],
        (error, results) => {
          if (error) throw error;
          console.log("tag added");
        }
      );
      res.status(200).send("Note updated successfully");
      console.log("Note updated");
    }
  );
};

const deleteNote = (req, res) => {
  console.log(req.body, "delete-body");
  const id = req.body.id;
  console.log(id);
  pool.query("call delete_note($1)", [id], (error, results) => {
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
