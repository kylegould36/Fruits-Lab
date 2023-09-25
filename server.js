const express = require("express");
const mongoose = require("mongoose");
const app = express();
const jsxEngine = require("jsx-view-engine");
//include the method-override package place this where you instructor places it
const methodOverride = require("method-override");
// IMPORT DOTENV MODULE TO CONNECT TO YOUR ENV FILE
const dotenv = require("dotenv");

// const fruits = require("./models/fruits.js"); //NOTE: it must start with ./ if it's just a file, not an NPM package

const Fruit = require("./models/fruits");

const vegetables = require("./models/vegetables.js");
app.set("view engine", "jsx");
app.engine("jsx", jsxEngine());

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("Connected to mongo");
});

//near the top, around other app.use() calls
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log("I run for all routes");
  next();
});

//after app has been defined
//use methodOverride.  We'll be adding a query parameter to our delete form named _method
app.use(methodOverride("_method"));

// index, new, delete. Update, create, edit. And show.

// seed route
app.get("/fruits/seed", async (req, res) => {
  try {
    await Fruit.create([
      {
        name: "grapefruit",
        color: "pink",
        readyToEat: true,
      },
      {
        name: "grape",
        color: "purple",
        readyToEat: false,
      },
      {
        name: "avocado",
        color: "green",
        readyToEat: true,
      },
    ]);
    res.redirect("/fruits");
  } catch (error) {
    console.error(error);
  }
});

//index
app.get("/fruits/", async (req, res) => {
  // res.send(fruits);
  // res.render("fruits/Index", { fruits: fruits });
  try {
    const fruits = await Fruit.find();
    res.render("fruits/Index", { fruits: fruits });
  } catch (error) {
    console.error(error);
  }
});

app.get("/vegetables/", (req, res) => {
  res.render("vegetables/Index", { vegetables: vegetables });
});

// new
app.get("/fruits/new", (req, res) => {
  res.render("fruits/New");
});

app.get("/vegetables/new", (req, res) => {
  res.render("vegetables/New");
});

// Delete
app.delete("/fruits/:id", async (req, res) => {
  try {
    await Fruit.findByIdAndRemove(req.params.id);
    res.redirect("/fruits"); //redirect back to fruits index
  } catch (error) {
    console.error(error);
  }
});

// update
app.put("/fruits/:id", async (req, res) => {
  try {
    if (req.body.readyToEat === "on") {
      //if checked, req.body.readyToEat is set to 'on'
      req.body.readyToEat = true; //do some data correction
    } else {
      //if not checked, req.body.readyToEat is undefined
      req.body.readyToEat = false; //do some data correction
    }
    // fruits.push(req.body);
    await Fruit.findByIdAndUpdate(req.params.id, req.body);

    res.redirect("/fruits");
  } catch (error) {
    console.log(error);
  }
});

// create
app.post("/fruits", async (req, res) => {
  try {
    if (req.body.readyToEat === "on") {
      //if checked, req.body.readyToEat is set to 'on'
      req.body.readyToEat = true; //do some data correction
    } else {
      //if not checked, req.body.readyToEat is undefined
      req.body.readyToEat = false; //do some data correction
    }
    // fruits.push(req.body);
    await Fruit.create(req.body);

    res.redirect("/fruits");
  } catch (error) {
    console.log(error);
  }
});

//Edit
app.get("/fruits/:id/edit", async (req, res) => {
  try {
    const foundFruit = await Fruit.findById(req.params.id);
    res.render("fruits/Edit", { fruit: foundFruit });
  } catch (error) {
    console.log(error);
  }
});

app.post("/vegetables", (req, res) => {
  if (req.body.readyToEat === "on") {
    req.body.readyToEat = true;
  } else {
    req.body.readyToEat = false;
  }
  vegetables.push(req.body);
  res.redirect("/vegetables");
});

//add show route
app.get("/fruits/:id", async (req, res) => {
  try {
    const fruit = await Fruit.findById(req.params.id);

    res.render("fruits/Show", { fruit: fruit });
  } catch (error) {
    console.log(error);
  }
});

app.get("/vegetables/:indexOfVegetablesArray", (req, res) => {
  res.render("vegetables/Show", {
    vegetable: vegetables[req.params.indexOfVegetablesArray],
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("listening");
});
