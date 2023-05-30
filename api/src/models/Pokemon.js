const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    hp: {
      type: DataTypes.INTEGER,
    },
    attack: {
      type: DataTypes.INTEGER,
    },
    defense: {
      type: DataTypes.INTEGER,
    },
    speed: {
      type: DataTypes.INTEGER,
    },
    height: {
      type: DataTypes.INTEGER,
    },
    weight: {
      type: DataTypes.INTEGER,
    },
    img: {
      type: DataTypes.STRING,
      defaultValue: 'https://i.pinimg.com/originals/32/eb/23/32eb230b326ee3c76e64f619a06f6ebb.png',
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
  },{
    timestamps: false,
  });
};
