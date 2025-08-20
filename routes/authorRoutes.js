const {
  getAuthors,
  getAuthor,
  addAuthor,
  updateAuthor,
  deleteAuthor,
} = require("../controllers/authorController");

const router = require("express").Router();

router.get("/", getAuthors);
router.get("/:authorId", getAuthor);
router.post("/", addAuthor);
router.put("/:authorId", updateAuthor);
router.delete("/:authorId", deleteAuthor);

module.exports = router;
