const express = require("express");
const router = express.Router();

const MenuItem = require("../models/MenuItem.js");

router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find({});
    res.status(200).json(data);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("something went wrong, could not fetch");
  }
});

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const newItem = new MenuItem(data);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("something went wrong, could not create");
  }
});
router.post("/:taste", async (req, res) => {
  try {
    const taste = req.params.taste;
    console.log(taste);

    const filteredTaste = await MenuItem.find({ taste: taste });
    res.status(200).json(filteredTaste);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("something went wrong, could not find");
  }
});

module.exports = router;
