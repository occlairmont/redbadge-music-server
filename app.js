require("dotenv").config();
let express = require("express");
let app = express();
let sequelize = require("./db");

let users = require("./controllers/userscontroller");
let admin = require("./controllers/admincontroller");
let events = require("./controllers/eventscontroller");
let music = require('./controllers/musiccontroller');
app.use(require("./middleware/headers"));

sequelize.sync();
app.use(express.json());

app.use("/users", users); // signup and login endpoints
app.use("/admin", admin); // admin endpoints
app.use("/music", music); //music endpoints
app.use("/events", events); // events endpoints

app.listen(process.env.PORT, function () {
  console.log(`App is listening on port ${process.env.PORT}`);
});

