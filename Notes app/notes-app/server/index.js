const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const moment = require('moment')
const jwt = require("jsonwebtoken");
const app = express();

//Google_Sign_in
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = "866133952316-a8r10cdbhjlsjroke88n2qrm5ul0jgfj.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);
let user;

app.use(cors());

const pool = require("./dbService");

//allows us to post and get json from our endpoints
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());

// app.use(express.json());

app.patch("/api/get-notes", authenticateToken, (req, res) => {
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

app.patch("/api/get-full-text", authenticateToken, (req, res) => {
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

app.post("/api/add-notes", authenticateToken, (req, res) => {
  console.log(req.body, "body");
  pool.query(
    "INSERT INTO note (title, note_content, note_date, nb_id, ws_id, bookmark) VALUES ($1, $2, $3, $4, $5, false)",
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

app.post("/api/edit-note", authenticateToken, (req, res) => {
  console.log(req.body, "body");
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
});

app.post("/api/delete-notes", authenticateToken, (req, res) => {
  console.log(req.body, "delete-body");
  const id = req.body.id;
  console.log(id);
  pool.query("delete from note where n_id = $1", [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
    console.log("Deleted a note");
  });
});

app.patch("/api/get-notebooks", authenticateToken, (req, res) => {
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

app.post("/api/add-notebook", authenticateToken, (req, res) => {
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

app.post("/api/delete-notebook", authenticateToken, (req, res) => {
  console.log(req.body, "delete-body");
  const id = req.body.nbID;
  console.log(id);
  pool.query("CALL delete_notebook($1)", [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
    console.log("Deleted a notebook");
  });
});

app.post("/api/rename-notebook", authenticateToken, (req, res) => {
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

app.get("/api/get-workspace", authenticateToken, (req, res) => {
  pool.query("select * from workspace", (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
});

app.post("/api/add-bookmark", authenticateToken, (req, res) => {
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

app.get("/api/get-bookmark", authenticateToken, (req, res) => {
  pool.query(
    "select * from prev where bookmark = $1 ",
    [true],
    (error, results) => {
      if (error) throw error;
      res.status(200).json(results.rows);
    }
  );
});

app.get("/api/get-recent", authenticateToken, (req, res) => {
  pool.query(
    "SELECT * FROM prev ORDER BY n_id DESC LIMIT 5 ",
    (error, results) => {
      if (error) throw error;
      res.status(200).json(results.rows);
    }
  );
});

//new_google_sign_in_login
app.patch('/api/login', async (req, res) => {
  let token = req.body.userInfo;
  let emailID;
  const temp = [];
  let user_id;

  try {
      const ticket = await client.verifyIdToken({
          idToken: token,
          audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
          });
          payload = ticket.getPayload();
          // const userid = payload['sub'];
          emailID= payload.email;
          user = { 'email': payload.email }

          if (emailID) {
              pool.query(
                  `SELECT * FROM users WHERE mail =$1`, [emailID],(err, results) => {
                      // valid emailID
                      // const temp= results.rows.u_id;
                      // console.log(temp);
                      if (results.rows.length == 0) {
                          pool.query(`INSERT INTO users (mail) VALUES ($1)`, [emailID], (err, results) => {
                              console.log("inserted email ID into users table");
                              if (err) {
                                  throw err;
                              }

                              pool.query(
                                `SELECT u_id FROM users WHERE mail =$1`, [emailID],(err, results) => {
                                  user_id = results.rows[0].u_id;
                                  // console.log(user_id);
                                  if (err) {
                                    throw err;
                                }

                              //new_sign_in=====>new_access_token
                              //JWT__TOKEN__SIGNING
                              const access_token = jwt.sign(user,'qwertyuiop1234567890');
                              temp.push({AccessToken : access_token});
                              temp.push({LoginStatus : "True"});
                              res.status(200).json(temp);      
                              const timestamp = Date.now();
                              created_date = moment(timestamp).local().format('YYYY-MM-DD HH:mm:ss');

                              pool.query(`INSERT INTO tokens (u_id, auth_token, creation_date) VALUES ($1, $2, $3)`, [user_id, access_token, created_date], (err, results) => {
                                console.log("inserted u_id, auth_token and creation_date into tokens table");
                                if (err) {
                                    throw err;
                                }
                              }) 
                            })  
                          });
                              // const refresh_token = jwt.sign(user,'1234567890qwertyuiop', {expiresIn: '1440'});
                              // res.cookie('refresh_token', refresh_token , {httpOnly: true, secure: true});      
                              // console.log(temp);
                           
                       }
                      else {

                        //user_already_exists____authenticate_access_token
                              console.log("user's email ID already exist");
                              pool.query(
                                `SELECT u_id FROM users WHERE mail =$1`, [emailID],(err, results) => {
                                  user_id = results.rows[0].u_id;
                                  if (err) {
                                    throw err;
                                }
                              const access_token = jwt.sign(user,'qwertyuiop1234567890');
                              temp.push({AccessToken : access_token});
                              temp.push({LoginStatus : "True"});
                              res.status(200).json(temp);      
                              const timestamp = Date.now();
                              created_date = moment(timestamp).local().format('YYYY-MM-DD HH:mm:ss');
                              console.log(created_date);

                              pool.query(`UPDATE tokens SET auth_token = $1, creation_date = $2 WHERE u_id = $3`, [access_token, created_date, user_id], (err, results) => {
                                console.log("updated u_id, auth_token and creation_date into tokens table");
                                if (err) {
                                    throw err;
                                }
                              }) })

                              // temp.push({LoginStatus : true});
                              // res.status(200).json(temp); 
                       }     
                       
                    
                  
                    })}        
      }
  catch (error) {
    //emailID_not_verified_by_Google
      console.log("emailID_not_verified_by_Google");
      throw err;
      }
})

//middleware
function authenticateToken(req, res, next) {
        try {
              const authHeader = req.headers['authorization']; //Bearer TOKEN
              const token = authHeader && authHeader.split(' ')[1];
              console.log(token);
              if (!token) {
                throw new Error('Authentication failed!');
                }
                const decodedToken = jwt.verify(token, 'qwertyuiop1234567890');
                console.log("Inside authenticateToken");
                console.log(decodedToken);
          
                user = {email: decodedToken.email};
                next();
                // if (user =  decodedToken.email)
                //       temp.push({LoginStatus : true});
                //       res.status(200).json(temp);              
                //       next();
                    } 
      catch (err) {
              console.log("Not a valid access_token");
              throw err;
              //  const error = new HttpError('Authentication failed!', 403);
              //  return next(error);
              }
        };


app.listen(5000, () => {
  console.log("Server is listening on the port 5000");
});
