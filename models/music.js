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
        url: {
            type: DataTypes.STRING(2000),
            allowNull: true
        }, 
        owner: {
            type: DataTypes.INTEGER
        }
    })

    return Music;
}