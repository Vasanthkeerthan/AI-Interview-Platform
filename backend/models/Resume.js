const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({

  userEmail: {
    type: String,
    required: true,
  },

  resumeFile: {
    type: String,
    required: true,
  },

  uploadedAt: {
    type: Date,
    default: Date.now,
  },

});

module.exports = mongoose.model("Resume", resumeSchema);