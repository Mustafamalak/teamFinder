const Post = require("../models/post");

// CREATE POST
exports.createPost = async (req, res) => {
  const { title, description, requiredSkills, teamSize, hackathonId } = req.body;

  if (!title || !description || !teamSize) {
    return res
      .status(400)
      .json({ msg: "Title, description, and teamSize are required" });
  }

  if (isNaN(teamSize) || teamSize < 2) {
    return res
      .status(400)
      .json({ msg: "teamSize must be a number of at least 2" });
  }

  try {
    const post = await Post.create({
      createdBy: req.user._id,
      hackathonId: hackathonId || undefined,
      title,
      description,
      requiredSkills: requiredSkills || [],
      teamSize,
      members: [req.user._id],
    });

    res.status(201).json(post);
  } catch (error) {
    console.error(error.message); 
    res.status(500).json({ msg: "Server error" });
  }
};

// GET ALL POSTS
exports.getPosts = async (req, res) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Number(req.query.limit) || 10, 50);

    const keyword = req.query.keyword
      ? {
          $or: [
            { title: { $regex: req.query.keyword, $options: "i" } },
            { description: { $regex: req.query.keyword, $options: "i" } },
          ],
        }
      : {};

    const skills = req.query.skills
      ? {
          requiredSkills: {
            $in: req.query.skills.split(",").map((s) => s.trim()),
          },
        }
      : {};

    const filter = { ...keyword, ...skills };

    const [total, posts] = await Promise.all([
      Post.countDocuments(filter),
      Post.find(filter)
        .populate("createdBy", "name email")
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
    ]);

    res.json({
      posts,
      page,
      pages: Math.ceil(total / limit),
      total,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server error" });
  }
};

// GET SINGLE POST
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("createdBy", "name email")
      .populate("members", "name email");

    if (!post) return res.status(404).json({ msg: "Post not found" });

    res.json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server error" });
  }
};

// UPDATE POST (owner only)
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ msg: "Post not found" });

    if (post.createdBy.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ msg: "Not authorized to update this post" });
    }

    const { title, description, requiredSkills, teamSize} = req.body;

    if (teamSize !== undefined && (isNaN(teamSize) || teamSize < 2)) {
      return res
        .status(400)
        .json({ msg: "teamSize must be a number of at least 2" });
    }

    post.title = title || post.title;
    post.description = description || post.description;
    post.requiredSkills = requiredSkills || post.requiredSkills;
    post.teamSize = teamSize || post.teamSize;

    const updated = await post.save();
    res.json(updated);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server error" });
  }
};

// DELETE POST (owner only)
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ msg: "Post not found" });

    if (post.createdBy.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ msg: "Not authorized to delete this post" });
    }

    await post.deleteOne();
    res.json({ msg: "Post deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server error" });
  }
};
