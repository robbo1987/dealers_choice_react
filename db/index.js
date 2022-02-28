const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DATABSE_URL || "postgres://localhost/guitar_shop"
);

const Guitar = sequelize.define("guitar", {
  name: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
});

const Brand = sequelize.define("brand", {
  name: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
});

Guitar.belongsTo(Brand);
Brand.hasMany(Guitar);

module.exports = {
    Guitar,
    Brand,
    sequelize
}