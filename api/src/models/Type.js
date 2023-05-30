const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('type', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        }
    }, {
        timestamps: false,
    })
}