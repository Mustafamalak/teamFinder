const mongoose = require("mongoose");

const hackathonSchema = new mongoose.Schema(
  {
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    platform: {
      type: String,
      default: "Unstop",
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    registrationLink: {
      type: String,
      required: true,
      trim: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
    mode: {
      type: String,
      enum: ["Online", "Offline", "Hybrid"],
      default: "Online",
    },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("hackathon", hackathonSchema);