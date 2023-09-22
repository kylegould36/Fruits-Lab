// STEP 1. IMPORT MONGOOSE
const mongoose = require("mongoose");

// STEP 2. CREATE YOU DATA SCHEMA
const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  readyToEat: {
    type: Boolean,
  },
});

// STEP 3. CREATE YOUR MODEL USING YOUR SCHEMA
const Fruit = mongoose.model("Fruit", fruitSchema);

// STEP 4. EXPORT YOUR NEWLY CREATED MODEL
module.exports = Fruit;
