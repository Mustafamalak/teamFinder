const Hackathon = require("../models/hackathon");

exports.createHackathon = async (req, res) => {
  try {
    const {
      title,
      platform,
      description,
      registrationLink,
      deadline,
      mode,
      tags,
    } = req.body;

    if (!title || !description || !registrationLink || !deadline) {
      return res.status(400).json({ msg: "Please fill all required fields" });
    }

    const isValidUrl =
      registrationLink.startsWith("http://") ||
      registrationLink.startsWith("https://");

    if (!isValidUrl) {
      return res.status(400).json({ msg: "Please provide a valid registration link" });
    }

    const hackathon = await Hackathon.create({
      postedBy: req.user._id,
      title: title.trim(),
      platform: platform || "Unstop",
      description: description.trim(),
      registrationLink: registrationLink.trim(),
      deadline,
      mode: mode || "Online",
      tags: Array.isArray(tags) ? tags : [],
    });

    res.status(201).json(hackathon);
  } catch (error) {
    console.error("Create hackathon error:", error.message);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.getHackathons = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 9;

    const keyword = req.query.keyword
      ? {
          $or: [
            { title: { $regex: req.query.keyword, $options: "i" } },
            { description: { $regex: req.query.keyword, $options: "i" } },
            { platform: { $regex: req.query.keyword, $options: "i" } },
          ],
        }
      : {};

    const mode = req.query.mode ? { mode: req.query.mode } : {};

    const filter = {
      ...keyword,
      ...mode,
      deadline: { $gte: new Date() },
    };

    const total = await Hackathon.countDocuments(filter);

    const hackathons = await Hackathon.find(filter)
      .populate("postedBy", "name email")
      .sort({ deadline: 1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      hackathons,
      page,
      pages: Math.ceil(total / limit),
      total,
    });
  } catch (error) {
    console.error("Get hackathons error:", error.message);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.getHackathonById = async (req, res) => {
  try {
    const hackathon = await Hackathon.findById(req.params.id).populate(
      "postedBy",
      "name email"
    );

    if (!hackathon) {
      return res.status(404).json({ msg: "Hackathon not found" });
    }

    res.json(hackathon);
  } catch (error) {
    console.error("Get hackathon error:", error.message);
    res.status(500).json({ msg: "Server error" });
  }
};