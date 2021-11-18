const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());

const pool = require("./dbService");

//allows us to post and get json from our endpoints
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());

// app.use(express.json());

app.patch("/api/get-notes", (req, res) => {
  console.log(req.body.notebook_id, "notebook id comes");
  pool.query(
    "select * from prev where nb_id=$1 ORDER BY n_id DESC",
    [req.body.notebook_id],
    (error, results) => {
      if (error) throw error;
      res.status(200).json(results.rows);
      console.log(results.rows);
    }
  );
});

app.patch("/api/get-full-text", (req, res) => {
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
});

app.post("/api/add-notes", (req, res) => {
  console.log(req.body, "body");
  pool.query(
    "INSERT INTO note (title, note_content, note_date, nb_id, ws_id) VALUES ($1, $2, $3, $4, $5)",
    [
      req.body.title,
      req.body.note_content,
      req.body.note_date,
      req.body.nb_id,
      req.body.ws_id,
    ],
    (error, results) => {
      if (error) throw error;
      res.status(200).send("Note added successfully");
      console.log("Note added");
    }
  );
});

app.post("/api/delete-notes", (req, res) => {
  console.log(req.body, "delete-body");
  const id = req.body.id;
  console.log(id);
  pool.query("delete from note where n_id = $1", [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
    console.log("Deleted a note");
  });
});

app.patch("/api/get-notebooks", (req, res) => {
  console.log("For work notebooks", req.body.ws_id);
  pool.query(
    "select * from notebook where ws_id=$1 ORDER BY nb_id DESC",
    [req.body.ws_id],
    (error, results) => {
      if (error) throw error;
      console.log(results.rows);
      res.status(200).json(results.rows);
    }
  );
});

app.post("/api/add-notebook", (req, res) => {
  pool.query(
    "INSERT INTO notebook (name, ws_id) VALUES ($1, $2)",
    [req.body.name, req.body.ws_id],
    (error, results) => {
      if (error) throw error;
      res.status(200).send("Notebook added successfully");
      console.log("Notebook added");
    }
  );
});

app.post("/api/delete-notebook", (req, res) => {
  console.log(req.body, "delete-body");
  const id = req.body.nbID;
  console.log(id);
  pool.query("CALL delete_notebook($1)", [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
    console.log("Deleted a notebook");
  });
});

app.post("/api/rename-notebook", (req, res) => {
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
});

app.get("/api/get-workspace", (req, res) => {
  pool.query("select * from workspace", (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
});

app.post("/api/add-bookmark", (req, res) => {
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
});

app.get("/api/get-bookmark", (req, res) => {
  pool.query(
    "select * from prev where bookmark = $1 ",
    [true],
    (error, results) => {
      if (error) throw error;
      res.status(200).json(results.rows);
    }
  );
});

app.get("/api/get-recent", (req, res) => {
  pool.query(
    "SELECT * FROM prev ORDER BY n_id DESC LIMIT 5 ",
    (error, results) => {
      if (error) throw error;
      res.status(200).json(results.rows);
    }
  );
});

app.listen(5000, () => {
  console.log("Server is listening on the port 5000");
});
