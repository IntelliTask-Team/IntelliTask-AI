const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const projectSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
});

module.exports = model("Task", projectSchema);
