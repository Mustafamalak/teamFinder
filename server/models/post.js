const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    hackathonId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "hackathon",
},

    title: { type: String, required: true },
    description: { type: String, required: true },
    requiredSkills: [{ type: String }],
    teamSize: { type: Number, required: true },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("post", postSchema);
