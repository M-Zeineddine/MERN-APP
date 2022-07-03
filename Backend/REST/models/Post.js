const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },
  customerAddress: {
    type: String,
    required: true,
  },
  customerMobile: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Posts", PostSchema);
