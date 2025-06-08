require('dotenv').config()
const express = require("express");
const connectToDb = require("./db.js");
const app = express();
const port = 3000;

//const URI = process.env.Local_MONGO_URI;

const URI = process.env.CLOUD_MONGO_URI
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Imports route handlers

const personRoutes = require("./routes/personRoutes.js");
const MenuItemsRoutes = require("./routes/MenuItemsRoutes.js");
app.use("/person", personRoutes);
app.use("/menu", MenuItemsRoutes);

app.get("/", (req, res) => {
  res.send("Hello sir how can i help you ");
});

connectToDb(URI)
  .then(() => {
    console.log("connection to Db successfully");
    app.listen(port, () =>
      console.log(
        `your server is running on port ${port} http://localhost:${port}`
      )
    );
  })
  .catch((err) => {
    console.log(err.message);
  });
