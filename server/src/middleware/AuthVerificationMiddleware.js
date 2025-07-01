const UserModel = require("../model/UserModel");
const { DecodeToken } = require("../utility/TokenHelper");

module.exports = async (req, res, next) => {
  try {
    let token = req.headers.jwt;
    if (!token) {
      token = req.cookies.jwt;
    }

    // Decode token
    let decoded = DecodeToken(token);
    if (!decoded) {
      return res.status(401).json({
        status: "fail",
        message: "unauthorized user",
      });
    }
    // Find user by ID
    const user = await UserModel.findById(decoded.userId).select('-password')
    if(!user){
        return res.status(404).json({
            status: "fail",
            message: "User Not Found",
        })
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
