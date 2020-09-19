const Sequelize = require("sequelize");

const sequelize = new Sequelize("redbadge-music-logs", "postgres", "password", {
    host: "localhost",
    dialect: 'postgres',
})
sequelize.authenticate().then(
    function() {
        console.log('Connected to redbadge-music-log postgres database');
    },
    function(err) {
        console.log(err);
    }
);
module.exports = sequelize;