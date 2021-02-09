const express = require("express");
const router = express.Router();
const User = require("../Model/User");
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const cloudinary = require("cloudinary").v2;

router.post("/user/signUp", async (req, res) => {
  console.log("road : user/signUp");
  try {
    console.log(req.fields);
    const { email, username, password } = req.fields;
    if (email && username && password) {
      const find = await User.findOne({ email: email });
      if (!find) {
        const newAccount = new User({
          email: email,
          username: username,
        });
        if (req.files.picture) {
          const picture = req.files.picture.path;
          console.log(picture);
          console.log("rrrrrrrrr");
          const result = await cloudinary.uploader.upload(picture, {
            folder: `marvel-test/user/picture/${newAccount._id}`,
          });
          newAccount.picture = result;
        }
        const token = uid2(64);
        const salt = uid2(64);
        const hash = SHA256(req.fields.password + salt).toString(encBase64);

        newAccount.token = token;
        newAccount.hash = hash;
        newAccount.salt = salt;

        await newAccount.save();

        res.status(200).json(newAccount);
      } else {
        res.status(400).json({
          message: "This email have already a account on this site 😢",
        });
      }
    } else {
      res
        .status(400)
        .json({ message: "Missing email or password or username" });
    }
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/user/login", async (req, res) => {
  console.log("road : /user/login");
  try {
    const find = await User.findOne({ email: req.fields.email });
    if (!find) {
      res.status(400).json({ message: "bad password or bad email" });
    } else {
      const password = req.fields.password;
      const userSalt = find.salt;
      const hashToCompare = SHA256(password + userSalt).toString(encBase64);

      if (find.hash === hashToCompare) {
        const userAccept = {
          id: find.id,
          token: find.token,
          picture: find.picture,
          username: find.username,
        };
        res.status(200).json(userAccept);
      } else {
        res.status(400).json({ message: "bad password or bad email" });
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.get("/user-read/:token", async (req, res) => {
  console.log("road : /user-read/:token");
  try {
    const find = await User.findOne({ token: req.params.token });

    await res.status(200).json(find);
  } catch (error) {
    res.status(200).json({ message: error.message });
  }
});

module.exports = router;
