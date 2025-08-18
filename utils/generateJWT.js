const jwt = require("jsonwebtoken");

module.exports = async (payload) => {
  const token=jwt.sign(payload,process.env.JWT_SCRET_KEY, { expiresIn: "5h" });
  return token;
};
