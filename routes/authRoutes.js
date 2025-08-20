const router = require("express").Router();
const { login, register } = require("../controllers/authController");
router.post("/log", login);
router.post("/reg", register);
module.exports = router;
