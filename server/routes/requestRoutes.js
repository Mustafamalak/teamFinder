const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  sendRequest,
  handleRequest,
  getMyRequests,
} = require("../controllers/requestController");

router.post("/:postId", protect, sendRequest);
router.patch("/:requestId", protect, handleRequest);
router.get("/me", protect, getMyRequests);

module.exports = router;