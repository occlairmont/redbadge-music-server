module.exports = (sequelize, DataTypes) => {
    const Events = sequelize.define('events', {
        date:{
            type: DataTypes.DATE,
            allowNull: false
        },
        artist: {
            type: DataTypes.STRING,
        },
        location:{
            type: DataTypes.STRING,
        },
        time: {
            type: DataTypes.STRING,
        },
        link: {
            type: DataTypes.STRING,
        },
        owner: {
            type: DataTypes.INTEGER,
        }
    });
    return Events;
}