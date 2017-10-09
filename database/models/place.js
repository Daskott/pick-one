module.exports = function(sequelize, DataTypes) {
    
    const Place = sequelize.define('Place', {
        googleId: {
            type: DataTypes.STRING,
            unique: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        photoUrl: {
            type: DataTypes.STRING
        }

    }/*,
    {
        freezeTableName: true // Model tableName will be the same as the model name
    }*/);

    return Place;
};