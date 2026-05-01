const User = require("../models/user");

// GET PROFILE
exports.getProfile = async (req, res) => {
  res.json(req.user);
};

// UPDATE PROFILE
exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.skills = req.body.skills || user.skills;
      user.bio = req.body.bio || user.bio;
      user.experienceLevel = req.body.experienceLevel || user.experienceLevel;

      const updatedUser = await user.save();

      res.json(updatedUser);
    } else {
      res.status(404).json({ msg: "User not found" });
    }
  } catch (error) {
    res.status(500).send("Server error");
  }
};
