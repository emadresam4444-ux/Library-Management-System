const express = require("express");
const router = express.Router();
const {
  getBorrowings,
  getBorrowing,
  addBorrowing,
  updateBorrowing,
  deleteBorrowing,
} = require("../controllers/borrowingController");

// REST APIs
router.get("/", getBorrowings);
router.get("/:borrowingId", getBorrowing);
router.post("/", addBorrowing);
router.put("/:borrowingId", updateBorrowing);
router.delete("/:borrowingId", deleteBorrowing);

module.exports = router;
