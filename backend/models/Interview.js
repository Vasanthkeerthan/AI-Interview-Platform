const mongoose =
  require("mongoose");

const interviewSchema =
  new mongoose.Schema({

    userEmail: String,

    questions: Array,

    answers: Array,

    technicalScore: Number,

    communicationScore: Number,

    confidenceScore: Number,

    overallScore: Number,

    feedback: String,

  },

  {

    timestamps: true,
  }
);

module.exports =
  mongoose.model(
    "Interview",
    interviewSchema
  );