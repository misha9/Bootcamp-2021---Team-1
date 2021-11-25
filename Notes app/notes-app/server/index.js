const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const noteRoutes = require("./src/routes/note/routes");
const notebookRoutes = require("./src/routes/notebook/routes");
const loginRoutes = require("./src/routes/login/routes");
const bookmarkRoutes = require("./src/routes/bookmark/routes");
const otherRoutes = require("./src/routes/others/routes");
const tags = require("./src/routes/tag/routes");

const app = express();

app.use(cors());

//allows us to post and get json from our endpoints
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());

app.use("/api", loginRoutes);
app.use("/api", noteRoutes);
app.use("/api", notebookRoutes);
app.use("/api", bookmarkRoutes);
app.use("/api", otherRoutes);
app.use("/api", tags);

app.listen(5000, () => {
  console.log("Server is listening on the port 5000");
});
