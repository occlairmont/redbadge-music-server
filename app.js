require("dotenv").config();
let express = require('express');
let app = express();
let sequelize = require('./db');

sequelize.sync();
app.use(require('./middleware/headers'));

app.use(express.json());


app.listen(3001, function(){
    console.log('App is listening on port 3001');
})

/* Kayla's Branch */