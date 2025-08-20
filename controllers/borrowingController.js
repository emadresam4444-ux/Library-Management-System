const borrowingModel = require("../modules/borrowing");
const httpStatusText = require("../utils/httpStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");
const { validationResult } = require("express-validator");

// Get all borrowings
const getBorrowings = asyncWrapper(async (req, res) => {
  const borrowings = await borrowingModel
    .find()
    .populate("user", "username email")
    .populate("book", "title");
  if (borrowings.length === 0)
    return res
      .status(404)
      .json({ status: httpStatusText.FAIL, data: borrowings });
  res.status(200).json({ status: httpStatusText.SUCCESS, data: borrowings });
});

// Get one borrowing
const getBorrowing = asyncWrapper(async (req, res) => {
  const borrowing = await borrowingModel
    .findById(req.params.borrowingId)
    .populate("user", "username email")
    .populate("book", "title");
  if (!borrowing)
    return res
      .status(404)
      .json({ status: httpStatusText.FAIL, data: borrowing });
  res.status(200).json({ status: httpStatusText.SUCCESS, data: borrowing });
});

// Add borrowing
const addBorrowing = asyncWrapper(async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty())
    return res
      .status(400)
      .json({ status: httpStatusText.FAIL, data: error.array() });

  const borrowing = await borrowingModel.create(req.body);
  res.status(201).json({ status: httpStatusText.SUCCESS, data: borrowing });
});

// Update borrowing (مثلا عند إرجاع الكتاب)
const updateBorrowing = asyncWrapper(async (req, res) => {
  const borrowing = await borrowingModel
    .findByIdAndUpdate(
      req.params.borrowingId,
      { $set: { ...req.body } },
      { new: true }
    )
    .populate("user", "username email")
    .populate("book", "title");

  if (!borrowing)
    return res
      .status(404)
      .json({ status: httpStatusText.FAIL, data: borrowing });
  res.status(200).json({ status: httpStatusText.SUCCESS, data: borrowing });
});

// Delete borrowing
const deleteBorrowing = asyncWrapper(async (req, res) => {
  const borrowing = await borrowingModel.findByIdAndDelete(
    req.params.borrowingId
  );
  if (!borrowing)
    return res
      .status(404)
      .json({ status: httpStatusText.FAIL, data: borrowing });
  res.status(200).json({ status: httpStatusText.SUCCESS, data: borrowing });
});

module.exports = {
  getBorrowings,
  getBorrowing,
  addBorrowing,
  updateBorrowing,
  deleteBorrowing,
};
