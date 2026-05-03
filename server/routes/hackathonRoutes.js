const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createHackathon,
  getHackathons,
  getHackathonById,
} = require("../controllers/hackathonController");

router.post("/", protect, createHackathon);
router.get("/", getHackathons);
router.get("/:id", getHackathonById);

module.exports = router;