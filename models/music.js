module.exports = (sequelize, DataTypes) => {
    const Music = sequelize.define('music', {
        song: {
            type: DataTypes.STRING, 
            allowNull: false
        },
        artist: {
            type: DataTypes.STRING,
            allowNull: false
        },
        album: {
            type: DataTypes.STRING,
            allowNull: false
        },
        text: {
            type: DataTypes.STRING(2000),
            allowNull: true
        }, 
        rating: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        owner: {
            type: DataTypes.INTEGER
        }
    })

    return Music;
}