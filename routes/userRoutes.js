const {
  getUsers,
  getUser,
  addUser,
  deleteUser,
  UpdateUser,
} = require("../controllers/userController");
const router = require("express").Router();
router.get("/", getUsers);
router.get("/:userId", getUser);
router.post("/", addUser);
router.delete("/:userId", deleteUser);
router.put("/:userId", UpdateUser);


module.exports = router;
