const Sequelize = require("sequelize");
const db = new Sequelize(
  process.env.DATABSE_URL || "postgres://localhost/guitar_shop"
);

const Guitar = db.define("guitar", {
  name: {
  type: Sequelize.DataTypes.STRING,
  allowNull: false,
  unique: true,
  validate: {
    notEmpty: true,
  },
}});

const Brand = db.define("brand", {
  name: {
    type:Sequelize.DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  }
})

Guitar.belongsTo(Brand)

const seedAndSync = async() => {
  try {
    await db.sync({ force: true });
    console.log("data is seeded");
    const fender = await Brand.create({name:'Fender'});
    const gibson = await Brand.create({name:"Gibson"});
    const ibanez = await Brand.create({name:"Ibanez"});
    const martin = await Brand.create({name:"Martin"})
    const prs = await Brand.create({name:"PRS"})
}
  catch(ex) {
    console.log(ex)
  }
};

seedAndSync();
