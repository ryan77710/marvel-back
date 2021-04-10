const express = require("express");
const router = express.Router();
const axios = require("axios");
const { json } = require("express");
const User = require("../Model/User");

const key = process.env.APIKEY;

router.get("/comics", async (req, res) => {
  console.log("road : /comic");
  try {
    const { title, skip, limit, token } = req.query;
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${key}&limit=${limit}&skip=${skip}&title=${title}`
    );
    if (!token) {
      res.status(200).json(response.data);
    } else {
      const user = await User.findOne({ token: token });
      const favComics = user.favoredComics;
      const tab = response.data.results;
      //add favored property
      tab.forEach((comic) => {
        favComics.forEach((favComic) => {
          if (comic._id === favComic.id) {
            comic.favored = true;
          }
        });
      });
      tab.forEach((comic) => {
        if (!comic.favored) {
          comic.favored = false;
        }
      });
      res.status(200).json({
        count: response.data.count,
        results: tab,
        limit: response.data.limit,
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/characters", async (req, res) => {
  console.log("road  : /character");
  try {
    const { skip, name, limit, token } = req.query;
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${key}&name=${
        name || ""
      }&limit=${limit || ""}&skip=${skip || ""}`
    );
    if (!token) {
      res.status(200).json(response.data);
    } else {
      const user = await User.findOne({ token: token });
      const favCharacters = user.favoredCharacters;
      const tab = response.data.results;
      //add favored property
      tab.forEach((character) => {
        favCharacters.forEach((favCharacter) => {
          if (character._id === favCharacter.id) {
            character.favored = true;
          }
        });
      });
      tab.forEach((character) => {
        if (!character.favored) {
          character.favored = false;
        }
      });
      res.status(200).json({
        count: response.data.count,
        results: tab,
        limit: response.data.limit,
      });
    }
  } catch (error) {
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
    res.status(400).json({ message: error.message });
  }
});

router.get("/character-favored", async (req, res) => {
  console.log("road : Character-favored");
  const { token, id, name, src, description, extension } = req.query;
  try {
    if (token) {
      if (id && name && src && description && extension) {
        const user = await User.findOne({ token: token });
        user.favoredCharacters;

        const userTab = user.favoredCharacters;
        for (let i = 0; i < userTab.length; i++) {
          if (userTab[i].id === id) {
            userTab.splice(i, 1);
            await user.save();
            return res
              .status(200)
              .json({ message: `Attention ${name} suprimé en favories` });
          }
        }
        user.favoredCharacters.push({
          id,
          name,
          description,
          src,
          extension,
          favored: true,
        });
        await user.save();
        res.status(200).json({ message: `Succes ${name} ajouté en favories` });
      } else {
        res.status(400).json({ message: "query missing !" });
      }
    } else {
      res.status(200).json({ message: "Connectez-vous" });
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
});
router.get("/character-favored-delete", async (req, res) => {
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
      res.status(200).json(user);
    } else {
      res.status(400).json({ message: "params missing" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.post("/comic-favored", async (req, res) => {
  console.log("road : Comic-favored");
  const { token, id, name, src, description, extension } = req.fields;
  try {
    if (token) {
      if (id && name && src && description && extension) {
        const user = await User.findOne({ token: token });
        user.favoredComics;

        const userTab = user.favoredComics;
        for (let i = 0; i < userTab.length; i++) {
          if (userTab[i].id === id) {
            userTab.splice(i, 1);
            await user.save();
            return res
              .status(200)
              .json({ message: `Attention ${name} suprimé en favories` });
          }
        }
        user.favoredComics.push({
          id,
          name,
          description,
          src,
          extension,
          favored: true,
        });
        await user.save();
        res.status(200).json({ message: `Succes ${name} ajouté en favories` });
      } else {
        res.status(200).json({ message: "Connectez-vous" });
      }
    } else {
      res.status(400).json({ message: "query missing !" });
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
});
router.get("/comic-favored-delete", async (req, res) => {
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
      res.status(200).json(userTab);
    } else {
      res.status(400).json({ message: "params missing" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
module.exports = router;
