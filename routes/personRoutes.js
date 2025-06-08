const express = require("express");
const router = express.Router();
const Person = require("../models/Person.js");

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const savedPerson = await newPerson.save();
    res.status(201).json(savedPerson);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something went wrong");
  }
});
router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    res.status(200).json(data);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Could not get the details");
  }
});
router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (workType === "chef" || workType === "owner" || workType === "manager") {
      const data = await Person.find({ role: workType });
      res.status(200).json(data);
    } else {
      res.status(404).send("Invalid could not get the work details");
    }

    // const data = await Person.find();
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Could not get the details");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const userID = req.params.id;
    const updatedData = req.body;
    const response = await Person.findByIdAndUpdate(userID, updatedData, {
      new: true,
      runValidators: true,
    });
    if (!response) {
      res.status(404).json({ message: "could not find the data" });
    }
    res.status(200).json({ message: "updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("something went wrong");
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const userID = req.params.id;
    const response = await Person.deleteOne({ _id: userID });
    if (!response) {
      res.status(404).json({ message: "failed to delete" });
    }
    res.status(200).json({ message: "deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("something went wrong");
  }
});
module.exports = router;
