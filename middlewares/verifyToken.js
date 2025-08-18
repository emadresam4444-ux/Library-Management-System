const jwt = require("jsonwebtoken");
const httpStatusText = require("../utils/httpStatusText");
module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.Authorization || req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        status: httpStatusText.FAIL,
        message: "Authorization header is missing",
      });
    }
    const token = authHeader.split(" ")[1]; //Bearer عشان ال
    if (!token) {
      return res.status(401).json({
        status: httpStatusText.FAIL,
        message: "Token not provided in header",
      });
    }
    jwt.verify(token, process.env.JWT_SCRET_KEY);
    next();
  } catch (err) {
    res.status(401).json({ status: httpStatusText.fail, data: err.message });
  }
};
