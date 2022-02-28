const db = require("./db");
const { Guitar } = db;
const { Brand } = db;
const sequelize = db.sequelize;

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");

app.use("/api", require("./api.routes"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.get("/", (req, res, next) =>
  res.sendFile(path.join(__dirname, "index.html"))
);

app.post("/", async (req, res, next) => {
  console.log(req.body);
  try {
    const brand = await Brand.create(req.body);
    const brandWithGuitars = await Brand.findByPk(brand.id, {include :[Guitar]} )
    res.send(brandWithGuitars);
  } catch (ex) {
    next(ex);
  }
});

const seedAndSync = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("data is seeded");
    const fender = await Brand.create({ name: "Fender" });
    const gibson = await Brand.create({ name: "Gibson" });
    const ibanez = await Brand.create({ name: "Ibanez" });
    const martin = await Brand.create({ name: "Martin" });
    const prs = await Brand.create({ name: "PRS" });
    const lesPaul = await Guitar.create({
      name: "Les Paul",
      brandId: gibson.id,
    });
    const sg = await Guitar.create({ name: "SG", brandId: gibson.id });
    const stratocaster = await Guitar.create({
      name: "Stratocaster",
      brandId: fender.id,
    });
    const telecaster = await Guitar.create({
      name: "Telecaster",
      brandId: fender.id,
    });
    const jem = await Guitar.create({
      name: "Steve Vai Jem",
      brandId: ibanez.id,
    });

    const d28 = await Guitar.create({ name: "D-28", brandId: martin.id });
    const d42 = await Guitar.create({ name: "D-42", brandId: martin.id });
    const custom24 = await Guitar.create({
      name: "Custom 24",
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

/*
app.post("/", async (req, res, next) => {
  try {
    console.log(req.body)
    const guitarist = await Guitarist.create(req.body);
    console.log(req.body)
    res.redirect("/");
  } catch (ex) {
    next(ex);
  }
}); */
