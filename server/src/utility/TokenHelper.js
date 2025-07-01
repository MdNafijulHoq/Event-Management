const jwt = require("jsonwebtoken");
const { JWT_KEY, JWT_EXPIRE_TIME } = require("../config/config.js");

const EncodeToken = (email, userId, res) => {
  const PAYLOAD = {
    email: email,
    userId: userId,
  };
  const KEY = JWT_KEY;
  const EXPIRE = { expiresIn: JWT_EXPIRE_TIME };

  const token = jwt.sign(PAYLOAD, KEY, EXPIRE);

  const cookieOptions = {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "Strict",
    secure: process.env.NODE_ENV !== "development",
  };

  res.cookie("jwt", token, cookieOptions);
  return token;
};

const DecodeToken = (token) => {
  try {
    return jwt.verify(token, JWT_KEY);
  } catch (error) {
    return null;
  }
};

module.exports = {
  EncodeToken,
  DecodeToken,
};
