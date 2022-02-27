const Sequelize = require("sequelize");
const db = new Sequelize(
  process.env.DATABSE_URL || "postgres://localhost/guitar_shop"
);
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require('path')

const Guitar = db.define("guitar", {
  name: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
});

const Brand = db.define("brand", {
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

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname,"index.html")));



app.get("/api/guitars", async (req, res, next) => {
  try {
    res.send(
      await Guitar.findAll({
        include: [Brand],
      })
    );
  } catch (ex) {
    next(ex);
  }
});

app.get("/api/brands", async (req, res, next) => {
  try {
    res.send(await Brand.findAll({ include: [Guitar] }));
  } catch (ex) {
    next(ex);
  }
});

app.get('/api/brands/:id', async (req,res,next) => {
  try{
      res.send(await Brand.findByPk(req.params.id, { include: Guitar}))
  }
  catch(ex) {
    next(ex)
  }
})

app.get('/api/guitars/:id', async (req,res,next) => {
  try{
      res.send(await Guitar.findByPk(req.params.id, { include: Brand}))
  }
  catch(ex) {
    next(ex)
  }
})






const seedAndSync = async () => {
  try {
    await db.sync({ force: true });
    console.log("data is seeded");
    const fender = await Brand.create({ name: "Fender" });
    const gibson = await Brand.create({ name: "Gibson" });
    const ibanez = await Brand.create({ name: "Ibanez" });
    const martin = await Brand.create({ name: "Martin" });
    const prs = await Brand.create({ name: "PRS" });
    const lesPaul = await Guitar.create({
      name: "les paul",
      brandId: gibson.id,
    });
    const stratocaster = await Guitar.create({
      name: "stratocaster",
      brandId: fender.id,
    });
    const telecaster = await Guitar.create({
      name: "telecaster",
      brandId: fender.id,
    });
    const jem = await Guitar.create({ name: "jem", brandId: ibanez.id });
    const sg = await Guitar.create({ name: "sg", brandId: gibson.id });
    const d28 = await Guitar.create({ name: "d-28", brandId: martin.id });
    const d42 = await Guitar.create({ name: "d-42", brandId: martin.id });
    const custom24 = await Guitar.create({
      name: "custom 24",
      brandId: prs.id,
    });
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  } catch (ex) {
    console.log(ex);
  }
};

seedAndSync();
