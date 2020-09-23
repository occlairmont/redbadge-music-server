require("dotenv").config();
let express = require('express');
let app = express();
let sequelize = require('./db');
let events = require("./controllers/eventscontroller");
// app.use(require('./middleware/headers'));

sequelize.sync();
app.use(express.json());
app.use("/events", events);

app.listen(3001, function(){
    console.log('App is listening on port 3001');
});

