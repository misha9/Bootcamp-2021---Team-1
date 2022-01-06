const pool = require("../../../dbService");
const moment = require("moment");
const jwt = require("jsonwebtoken");

//Google_Sign_in
const { OAuth2Client } = require("google-auth-library");
const CLIENT_ID =
  "866133952316-a8r10cdbhjlsjroke88n2qrm5ul0jgfj.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);
let user;

const login = async (req, res) => {
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
    emailID = payload.email;
    user = { email: payload.email };

    if (emailID) {
      pool.query(
        `SELECT * FROM users WHERE mail =$1`,
        [emailID],
        (err, results) => {
          if (results.rows.length == 0) {
            pool.query(
              `INSERT INTO users (mail) VALUES ($1)`,
              [emailID],
              (err, results) => {
                console.log("inserted email ID into users table");
                if (err) {
                  throw err;
                }

                pool.query(
                  `SELECT u_id FROM users WHERE mail =$1`,
                  [emailID],
                  (err, results) => {
                    user_id = results.rows[0].u_id;
                    temp.push({ userID: user_id });
                    if (err) {
                      throw err;
                    }
                    //new_sign_in=====>new_access_token
                    //JWT__TOKEN__SIGNING
                    const access_token = jwt.sign(
                      user,
                      "qwertyuiop1234567890",
                      {
                        expiresIn: "1hr",
                      }
                    );
                    temp.push({
                      AccessToken: access_token,
                    });
                    temp.push({ LoginStatus: "True" });
                    res.status(200).json(temp);
                    const timestamp = Date.now();
                    created_date = moment(timestamp)
                      .local()
                      .format("YYYY-MM-DD HH:mm:ss");

                    pool.query(
                      `INSERT INTO tokens (u_id, auth_token, creation_date) VALUES ($1, $2, $3)`,
                      [user_id, access_token, created_date],
                      (err, results) => {
                        console.log(
                          "inserted u_id, auth_token and creation_date into tokens table"
                        );
                        if (err) {
                          throw err;
                        }
                      }
                    );
                  }
                );
              }
            );
          } else {
            //user_already_exists____authenticate_access_token
            console.log("user's email ID already exist");
            pool.query(
              `SELECT u_id FROM users WHERE mail =$1`,
              [emailID],
              (err, results) => {
                user_id = results.rows[0].u_id;
                temp.push({ userID: user_id });
                if (err) {
                  throw err;
                }
                const access_token = jwt.sign(user, "qwertyuiop1234567890", {
                  expiresIn: "1hr",
                });
                temp.push({ AccessToken: access_token });
                temp.push({ LoginStatus: "True" });
                res.status(200).json(temp);
                const timestamp = Date.now();
                created_date = moment(timestamp)
                  .local()
                  .format("YYYY-MM-DD HH:mm:ss");
                console.log(created_date);

                pool.query(
                  `UPDATE tokens SET auth_token = $1, creation_date = $2 WHERE u_id = $3`,
                  [access_token, created_date, user_id],
                  (err, results) => {
                    console.log(
                      "updated u_id, auth_token and creation_date into tokens table"
                    );
                    if (err) {
                      throw err;
                    }
                  }
                );
              }
            );
          }
        }
      );
    }
  } catch (error) {
    //emailID_not_verified_by_Google
    console.log("emailID_not_verified_by_Google");
    throw err;
  }
};

function authenticateToken(req, res, next) {
  // console.log(req.headers, req.headers["authorization"], "kjjkdasn");
  try {
    console.log(req.headers);
    const authHeader = req.headers["authorization"]; //Bearer TOKEN
    const token = authHeader && authHeader.split(" ")[1];

    console.log(
      token,
      "jkdaskjahsdkahsdkjahsdkjsahjkdhaskjdhaskdaskjdhaskjdas"
    );
    if (!token) {
      console.log("my name is rashad");

      res.json(false);
      throw new Error("Authentication failed!");
    }
    const decodedToken = jwt.verify(token, "qwertyuiop1234567890");
    console.log("Inside authenticateToken");
    console.log(decodedToken);

    user = { email: decodedToken.email };
    next();
  } catch (err) {
    console.log("Not a valid access_token");
    res.json(false);
    throw err;
  }
}

module.exports = {
  login,
  authenticateToken,
};
