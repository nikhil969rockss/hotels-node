const mongoose = require("mongoose");

const menuItemsSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
    default: 0,
  },
  taste: {
    type: String,
    enum: ["spicy", "sweet", "sour"],
    require: true,
  },
  isDrink: {
    type: Boolean,
    require: true,
    default: false,
  },
  ingredients: {
    type: [String],
    require: true,
    default: [],
  },
  numSales: {
    type: Number,
    require: true,
    default: 0,
  },
});

const MenuItems = mongoose.model("MenuItem", menuItemsSchema);
module.exports = MenuItems;
