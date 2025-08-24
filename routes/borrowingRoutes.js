const express = require("express");
const router = express.Router();
const allowedTo = require("../middlewares/allowedTo");
const userRoles = require("../utils/userRoles");
const verifyToken = require("../middlewares/verifyToken");
const {
  getBorrowings,
  getBorrowing,
  addBorrowing,
  updateBorrowing,
  deleteBorrowing,
} = require("../controllers/borrowingController");

// REST APIs
router
  .route("/")
  .get(verifyToken, getBorrowings)
  .post(verifyToken,allowedTo(userRoles.ADMIN), addBorrowing);

router
  .route("/:borrowingId")
  .get(verifyToken, getBorrowing)
  .put(verifyToken,allowedTo(userRoles.ADMIN,userRoles.AUTHOR), updateBorrowing)
  .delete(verifyToken,allowedTo(userRoles.ADMIN), deleteBorrowing);

module.exports = router;
