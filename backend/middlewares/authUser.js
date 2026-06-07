import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {

    const token = req.headers.token;

    console.log("User Token:", token);

    if (!token) {
      return res.json({
        success: false,
        message: "Not Authorized. Login Again"
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    console.log("Decoded User:", decoded);

    req.userId = decoded.id;

    next();

  } catch (error) {

    console.log("User Auth Error:", error.message);

    res.json({
      success: false,
      message: "Not Authorized. Login Again"
    });

  }
};

export default authUser;