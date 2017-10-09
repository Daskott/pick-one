module.exports = function(sequelize, DataTypes) {
    
    const User = sequelize.define('User', {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING
        },
        googleId: {
            type: DataTypes.STRING
        },
        facebookId: {
            type: DataTypes.STRING        
        }

    }/*,
    {
        freezeTableName: true // Model tableName will be the same as the model name
    }*/);

    return User;
};