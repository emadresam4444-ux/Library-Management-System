const {
  getUsers,
  getUser,
  addUser,
  deleteUser,
  UpdateUser,
} = require("../controllers/userController");
const verifyToken = require("../middlewares/verifyToken");
const router = require("express").Router();
router.get("/", verifyToken, getUsers);
router.get("/:userId", verifyToken, getUser);
router.post("/", verifyToken, addUser);
router.delete("/:userId", verifyToken, deleteUser);
router.put("/:userId", verifyToken, UpdateUser);

module.exports = router;
