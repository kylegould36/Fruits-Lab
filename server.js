const express = require("express");
const app = express();
const jsxEngine = require("jsx-view-engine");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

dotenv.config();

const Fruit = require("./models/fruits.js");
const Vegetable = require("./models/vegetables.js");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use((req, res, next) => {
  console.log("Run all the routes");
  next();
});

app.use(methodOverride("_method"));

app.set("view engine", "jsx");
app.engine("jsx", jsxEngine());

// Tell express to use the middleware
app.use(express.urlencoded({ extended: false }));

/*
  Fruits Routes
*/

// List all fruits
app.get("/fruits", async (req, res) => {
  try {
    const fruits = await Fruit.find();
    res.render("fruits/Index", { fruits });
  } catch (error) {
    console.error(error);
  }
});

// Display the form for creating a new fruit
app.get("/fruits/new", (req, res) => {
  res.render("fruits/New");
});

// Create a new fruit
app.post("/fruits", async (req, res) => {
  try {
    let readyToEat = false;
    if (req.body.readyToEat === "on") {
      readyToEat = true;
    }

    const newFruit = new Fruit({
      name: req.body.name,
      color: req.body.color,
      readyToEat: readyToEat,
    });

    await newFruit.save();
    res.redirect("/fruits");
  } catch (error) {
    console.error(error);
  }
});

// Edit a fruit
app.get("/fruits/:id/edit", async (req, res) => {
  try {
    const foundFruit = await Fruit.findById(req.params.id);
    res.render("fruits/Edit", {
      fruit: foundFruit,
    });
  } catch (error) {
    console.error(error);
    res.send({ msg: error.message });
  }
});

// Update a fruit
app.put("/fruits/:id", async (req, res) => {
  try {
    if (req.body.readyToEat === "on") {
      req.body.readyToEat = true;
    } else {
      req.body.readyToEat = false;
    }
    await Fruit.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/fruits");
  } catch (error) {
    console.error(error);
  }
});

// Delete a fruit
app.delete("/fruits/:id", async (req, res) => {
  try {
    await Fruit.findByIdAndDelete(req.params.id);
    res.redirect("/fruits");
  } catch (error) {
    console.error(error);
  }
});

// Show a fruit
app.get("/fruits/:id", async (req, res) => {
  try {
    const fruit = await Fruit.findById(req.params.id);
    res.render("fruits/Show", { fruit });
  } catch (error) {
    console.error(error);
  }
});

/*
  Vegetables Routes
*/

// List all vegetables
app.get("/vegetables", async (req, res) => {
  try {
    const vegetables = await Vegetable.find();
    res.render("vegetables/Index", { vegetables });
  } catch (error) {
    console.error(error);
  }
});

// Display the form for creating a new vegetable
app.get("/vegetables/new", (req, res) => {
  res.render("vegetables/New");
});

// Create a new vegetable
app.post("/vegetables", async (req, res) => {
  try {
    let readyToEat = false;
    if (req.body.readyToEat === "on") {
      readyToEat = true;
    }
    const newVegetable = new Vegetable({
      name: req.body.name,
      color: req.body.color,
      readyToEat: readyToEat,
    });
    await newVegetable.save();
    res.redirect("/vegetables");
  } catch (error) {
    console.error(error);
  }
});

// Edit a vegetable
app.get("/vegetables/:id/edit", async (req, res) => {
  try {
    const foundVegetable = await Vegetable.findById(req.params.id);
    res.render("vegetables/Edit", {
      vegetable: foundVegetable,
    });
  } catch (error) {
    console.error(error);
    res.send({ msg: error.message });
  }
});

// Update a vegetable
app.put("/vegetables/:id", async (req, res) => {
  try {
    if (req.body.readyToEat === "on") {
      req.body.readyToEat = true;
    } else {
      req.body.readyToEat = false;
    }
    await Vegetable.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/vegetables");
  } catch (error) {
    console.error(error);
  }
});

// Delete a vegetable
app.delete("/vegetables/:id", async (req, res) => {
  try {
    await Vegetable.findByIdAndDelete(req.params.id);
    res.redirect("/vegetables");
  } catch (error) {
    console.error(error);
  }
});

// Show a vegetable
app.get("/vegetables/:id", async (req, res) => {
  try {
    const vegetable = await Vegetable.findById(req.params.id);
    res.render("vegetables/Show", { vegetable });
  } catch (error) {
    console.error(error);
  }
});

//add show route for fruits
app.get("/fruits/:id", async (req, res) => {
  try {
    const fruit = await Fruit.findById(req.params.id);
    res.render("fruits/Show", { fruit });
  } catch (error) {
    console.error(error);
  }
});

mongoose.connection.once("open", () => {
  console.log("connected to mongo");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("listening to port 3000");
});
