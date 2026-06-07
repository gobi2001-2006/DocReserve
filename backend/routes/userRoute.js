import express from "express";
import authUser from "../middlewares/authUser.js";
import upload from "../middlewares/multer.js";

import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,listAppointments,cancelAppointment,paymentRazorpay,
  verifyRazorpay
} from "../controllers/userController.js";

const userRouter = express.Router();

// Authentication
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

// Profile
userRouter.get(
  "/get-profile",
  authUser,
  getProfile
);

userRouter.post(
  "/update-profile",
  authUser,
  upload.single("image"),
  updateProfile
);
userRouter.post(
  "/book-appointment",
  authUser,
  bookAppointment
);
userRouter.get(
  "/appointments",
  authUser,
  listAppointments
);
userRouter.post(
  "/cancel-appointment",
  authUser,
  cancelAppointment
);
userRouter.post(

  "/payment-razorpay",

  authUser,

  paymentRazorpay

);

userRouter.post(

  "/verify-razorpay",

  authUser,

  verifyRazorpay

);
export default userRouter;