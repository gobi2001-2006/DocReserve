import jwt from "jsonwebtoken";

// Admin authentication middleware
const authAdmin = async (req, res, next) => {
  try {
    const atoken = req.headers.atoken;

    console.log("Received Token:", atoken);

    if (!atoken) {
      return res.json({
        success: false,
        message: "Not Authorized. Login Again"
      });
    }

    const decoded = jwt.verify(
      atoken,
      process.env.JWT_SECRET
    );

    console.log("Decoded Token:", decoded);

    if (decoded.email !== process.env.ADMIN_EMAIL) {
      return res.json({
        success: false,
        message: "Not Authorized. Login Again"
      });
    }

    next();

  } catch (error) {
    console.log("Auth Error:", error.message);

    res.json({
      success: false,
      message: "Not Authorized. Login Again"
    });
  }
};

export default authAdmin;