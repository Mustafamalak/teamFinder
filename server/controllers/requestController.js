const Request = require("../models/request");
const Post = require("../models/post");

// SEND JOIN REQUEST
exports.sendRequest = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    if (post.createdBy.toString() === req.user._id.toString()) {
      return res
        .status(400)
        .json({ msg: "You cannot request to join your own team" });
    }

    if (
      post.members.some(
        (member) => member.toString() === req.user._id.toString(),
      )
    ) {
      return res.status(400).json({ msg: "You are already a team member" });
    }

    if (post.members.length >= post.teamSize) {
      return res.status(400).json({ msg: "Team is already full" });
    }

    const existingRequest = await Request.findOne({
      postId: post._id,
      sender: req.user._id,
      status: "pending",
    });

    if (existingRequest) {
      return res.status(400).json({ msg: "Request already sent" });
    }

    const request = await Request.create({
      postId: post._id,
      sender: req.user._id,
    });

    res.status(201).json(request);
  } catch (error) {
    console.error("Send request error:", error.message);
    res.status(500).json({ msg: "Server error" });
  }
};

// ACCEPT / REJECT REQUEST
exports.handleRequest = async (req, res) => {
  try {
    const { action } = req.body;

    if (!["accept", "reject"].includes(action)) {
      return res.status(400).json({ msg: "Invalid action" });
    }

    const request = await Request.findById(req.params.requestId);

    if (!request) {
      return res.status(404).json({ msg: "Request not found" });
    }

    if (request.status !== "pending") {
      return res.status(400).json({ msg: "Request already handled" });
    }

    const post = await Post.findById(request.postId);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    if (post.createdBy.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ msg: "Not authorized to handle this request" });
    }

    if (action === "accept") {
      if (post.members.length >= post.teamSize) {
        return res.status(400).json({ msg: "Team is already full" });
      }

      if (
        !post.members.some(
          (member) => member.toString() === request.sender.toString(),
        )
      ) {
        post.members.push(request.sender);
      }

      request.status = "accepted";
      await post.save();
    }

    if (action === "reject") {
      request.status = "rejected";
    }

    await request.save();

    res.json({
      msg: `Request ${request.status}`,
      request,
    });
  } catch (error) {
    console.error("Handle request error:", error.message);
    res.status(500).json({ msg: "Server error" });
  }
};

// REQUESTS SENT BY LOGGED-IN USER
exports.getMyRequests = async (req, res) => {
  try {
    const requests = await Request.find({ sender: req.user._id })
      .populate(
        "postId",
        "title description requiredSkills teamSize members createdBy",
      )
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    console.error("Get my requests error:", error.message);
    res.status(500).json({ msg: "Server error" });
  }
};

// REQUESTS RECEIVED ON MY POSTS
exports.getIncomingRequests = async (req, res) => {
  try {
    const myPosts = await Post.find({ createdBy: req.user._id }).select("_id");

    const postIds = myPosts.map((post) => post._id);

    const requests = await Request.find({ postId: { $in: postIds } })
      .populate("sender", "name email skills experienceLevel")
      .populate("postId", "title teamSize members")
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    console.error("Get incoming requests error:", error.message);
    res.status(500).json({ msg: "Server error" });
  }
};
