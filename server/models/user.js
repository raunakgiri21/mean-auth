const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxLength: [50, "Name should not be more than 50 characters!"],
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      min: 8,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
