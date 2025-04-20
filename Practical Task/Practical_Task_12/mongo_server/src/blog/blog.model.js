const mongoose = require("mongoose");

var schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now(), 
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

var blog = new mongoose.model("exp_6_blog", schema);
module.exports = blog;
