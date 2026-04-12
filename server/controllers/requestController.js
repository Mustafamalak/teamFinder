const Request = require("../models/request");
const Post = require("../models/post");

// SEND REQUEST
exports.sendRequest = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) return res.status(404).json({ msg: "Post not found" });

    // ❌ Prevent self-request
    if (post.createdBy.toString() === req.user._id.toString()) {
      return res.status(400).json({ msg: "You are the creator" });
    }

    // ❌ Prevent duplicate request
    const existingRequest = await Request.findOne({
      postId: post._id,
      sender: req.user._id,
    });

    if (existingRequest) {
      return res.status(400).json({ msg: "Request already sent" });
    }

    // ❌ Check team full
    if (post.members.length >= post.teamSize) {
      return res.status(400).json({ msg: "Team is already full" });
    }

    const request = await Request.create({
      postId: post._id,
      sender: req.user._id,
    });

    res.status(201).json(request);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server error" });
  }
};

// ACCEPT / REJECT REQUEST
exports.handleRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.requestId);

    // Guard must come BEFORE accessing request.postId
    if (!request) return res.status(404).json({ msg: "Request not found" });

    const { action } = req.body;

    if (!action || !["accept", "reject"].includes(action)) {
      return res.status(400).json({ msg: 'action must be "accept" or "reject"' });
    }

    const post = await Post.findById(request.postId);

    if (!post) return res.status(404).json({ msg: "Post not found" });

    // Only the post creator can accept/reject
    if (post.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ msg: "Not authorized" });
    }

    if (action === "accept") {
      if (post.members.length >= post.teamSize) {
        return res.status(400).json({ msg: "Team already full" });
      }

      request.status = "accepted";
      post.members.push(request.sender);
      await post.save();
    } else {
      request.status = "rejected";
    }

    await request.save();

    res.json({ msg: `Request ${action}ed successfully` });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server error" });
  }
};

// GET MY REQUESTS
exports.getMyRequests = async (req, res) => {
  try {
    const requests = await Request.find({ sender: req.user._id })
      .populate("postId", "title")
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server error" });
  }
};