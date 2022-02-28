const db = require("./db");
const { Guitar } = db;
const { Brand } = db;

const app = require('express').Router()
module.exports = app;


app.get("/guitars", async (req, res, next) => {
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

app.get("/brands", async (req, res, next) => {
  try {
    res.send(await Brand.findAll({ include: [Guitar] }));
  } catch (ex) {
    next(ex);
  }
});

app.get("/brands/:id", async (req, res, next) => {
  try {
    res.send(await Brand.findByPk(req.params.id, { include: Guitar }));
  } catch (ex) {
    next(ex);
  }
});

app.get("/guitars/:id", async (req, res, next) => {
  try {
    res.send(await Guitar.findByPk(req.params.id, { include: Brand }));
  } catch (ex) {
    next(ex);
  }
});