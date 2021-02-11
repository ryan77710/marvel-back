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
  console.log("road  : /character");
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
    console.log(response.data);
    res.status(200).json(response.data);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

router.get("/Character-favored", async (req, res) => {
  console.log("road : Character-favored");
  const { token, id, name, src, description, extension } = req.query;
  try {
    if (token && id && name && src && description && extension) {
      const user = await User.findOne({ token: token });
      user.favoredCharacters;

      const userTab = user.favoredCharacters;
      for (let i = 0; i < userTab.length; i++) {
        if (userTab[i].id === id) {
          return res
            .status(200)
            .json({ message: `Attention ${name} déja en favories` });
        }
      }
      user.favoredCharacters.push({ id, name, description, src, extension });
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
  const { token, id, name } = req.query;
  try {
    if (token && id && name) {
      const { token, id, name } = req.query;
      const user = await User.findOne({ token: token });

      const userTab = user.favoredCharacters;

      for (let i = 0; i < userTab.length; i++) {
        if (userTab[i].id === id) {
          user.favoredCharacters.splice(i, 1);
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
  const { token, id, name, src, description, extension } = req.fields;
  try {
    if (token && id && name && src && description && extension) {
      const user = await User.findOne({ token: token });
      user.favoredComics;

      const userTab = user.favoredComics;
      for (let i = 0; i < userTab.length; i++) {
        if (userTab[i].id === id) {
          return res
            .status(200)
            .json({ message: `Attention ${name} déja en favories` });
        }
      }
      user.favoredComics.push({ id, name, description, src, extension });
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
  const { token, id, name } = req.query;
  try {
    if (token && id && name) {
      const user = await User.findOne({ token: token });
      const userTab = user.favoredComics;

      for (let i = 0; i < userTab.length; i++) {
        if (userTab[i].id === id) {
          user.favoredComics.splice(i, 1);
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
