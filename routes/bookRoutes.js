const {
  getBooks,
  getBook,
  addBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

const router = require("express").Router();

router.get("/", getBooks);
router.get("/:bookId", getBook);
router.post("/", addBook);
router.put("/:bookId", updateBook);
router.delete("/:bookId", deleteBook);

module.exports = router;
