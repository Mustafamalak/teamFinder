const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  sendRequest,
  handleRequest,
  getMyRequests,
  getIncomingRequests,
} = require("../controllers/requestController");

router.get("/me", protect, getMyRequests);
router.get("/incoming", protect, getIncomingRequests);

router.post("/:postId", protect, sendRequest);
router.patch("/:requestId", protect, handleRequest);

module.exports = router;