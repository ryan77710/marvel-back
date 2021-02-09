const express = require("express");
const router = express.Router();
const axios = require("axios");
const { json } = require("express");
const User = require("../Model/User");

const key = process.env.APIKEY;

router.get("/comics", async (req, res) => {
  console.log("road : /comic");
  try {
    const { title, skip, limit } = req.query;
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${key}&limit=${limit}&skip=${skip}&title=${title}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

router.get("/characters", async (req, res) => {
  console.log("silk road 😉 : /character");
  try {
    console.log(req.query);
    const { skip, name, limit } = req.query;
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${key}&name=${
        name || ""
      }&limit=${limit || ""}&skip=${skip || ""}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

router.get("/character-comic/:id", async (req, res) => {
  console.log("road : /character-comic");
  try {
    const character = req.params.id;
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${character}?apiKey=${key}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

router.get("/Character-favored", async (req, res) => {
  console.log("road : Character-favored");
  try {
    if (
      req.query.token &&
      req.query.id &&
      req.query.name &&
      req.query.src &&
      req.query.description &&
      req.query.extension
    ) {
      const { token, id, name, src, description, extension } = req.query;
      const user = await User.findOne({ token: token });
      user.favoredCharacter;

      const userTab = user.favoredCharacter;
      for (let i = 0; i < userTab.length; i++) {
        if (userTab[i].id === id) {
          return res
            .status(200)
            .json({ message: `Attention ${name} déja en favories` });
        }
      }
      user.favoredCharacter.push({ id, name, description, src, extension });
      await user.save();
      res.status(200).json({ message: `Succes ${name} ajouté en favories` });
    } else {
      res.status(400).json({ message: "query missing !" });
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
});
router.get("/Character-favored-delete", async (req, res) => {
  console.log("road : /Character-favored-delete ");
  try {
    if (req.query.token && req.query.id && req.query.name) {
      const { token, id, name } = req.query;
      const user = await User.findOne({ token: token });
      const userTab = user.favoredCharacter;
      for (let i = 0; i < userTab.length; i++) {
        if (userTab[i].id === id) {
          user.favoredCharacter.splice(i, 1);
        }
      }
      await user.save();
      res.status(200).json({ message: `${name} suprimé des favories` });
    } else {
      res.status(400).json({ message: "params missing" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error.message);
  }
});
router.post("/Comic-favored", async (req, res) => {
  console.log("road : Comic-favored");
  try {
    console.log(req.fields.extension);

    if (
      req.fields.token &&
      req.fields.id &&
      req.fields.name &&
      req.fields.src &&
      req.fields.description &&
      req.fields.extension
    ) {
      console.log("----------------------------------------------------");
      console.log(req.fields.description);
      const { token, id, name, src, description, extension } = req.fields;
      const user = await User.findOne({ token: token });
      user.favoredComic;

      const userTab = user.favoredComic;
      for (let i = 0; i < userTab.length; i++) {
        if (userTab[i].id === id) {
          return res
            .status(200)
            .json({ message: `Attention ${name} déja en favories` });
        }
      }
      console.log("----------------------------------------------------");
      user.favoredComic.push({ id, name, description, src, extension });
      await user.save();
      res.status(200).json({ message: `Succes ${name} ajouté en favories` });
    } else {
      res.status(400).json({ message: "query missing !" });
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
});
router.get("/Comic-favored-delete", async (req, res) => {
  console.log("road : /Comic-favored-delete ");
  try {
    if (req.query.token && req.query.id && req.query.name) {
      const { token, id, name } = req.query;
      const user = await User.findOne({ token: token });
      const userTab = user.favoredComic;
      for (let i = 0; i < userTab.length; i++) {
        if (userTab[i].id === id) {
          user.favoredComic.splice(i, 1);
        }
      }
      await user.save();
      res.status(200).json({ message: `${name} suprimé des favories` });
    } else {
      res.status(400).json({ message: "params missing" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error.message);
  }
});
module.exports = router;
