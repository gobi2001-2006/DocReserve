import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";
import appointmentModel from "../models/appointmentModel.js";
import doctorModel from "../models/doctorModel.js";
import razorpay from "../config/razorpay.js";

// Register User
const registerUser = async (req, res) => {

  try {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({
        success: false,
        message: "Missing Details"
      });
    }

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Enter valid email"
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Enter strong password"
      });
    }

    const userExists =
      await userModel.findOne({ email });

    if (userExists) {
      return res.json({
        success: false,
        message: "User already exists"
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);

    const hashedPassword =
      await bcrypt.hash(password, salt);

    // Save user
    const userData = {
      name,
      email,
      password: hashedPassword
    };

    const newUser = new userModel(userData);

    const user = await newUser.save();

    // Generate token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET
    );

    res.json({
      success: true,
      token
    });

  } catch (error) {

    console.log(error);

    res.json({
      success: false,
      message: error.message
    });

  }

};

// Login User
const loginUser = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user =
      await userModel.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User does not exist"
      });
    }

    const isMatch =
      await bcrypt.compare(password, user.password);

    if (isMatch) {

      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET
      );

      res.json({
        success: true,
        token
      });

    } else {

      res.json({
        success: false,
        message: "Invalid credentials"
      });

    }

  } catch (error) {

    console.log(error);

    res.json({
      success: false,
      message: error.message
    });

  }

};
const updateProfile = async (req, res) => {

  try {

    const imageFile = req.file;

    const {
      name,
      phone,
      gender,
      dob,
      address
    } = req.body;

    let imageUrl;

    if (imageFile) {

      const upload = await cloudinary.uploader.upload(
        imageFile.path
      );

      imageUrl = upload.secure_url;

    }

    const updateData = {
      name,
      phone,
      gender,
      dob,
      address: JSON.parse(address)
    };

    if (imageUrl) {

      updateData.image = imageUrl;

    }

    await userModel.findByIdAndUpdate(
      req.userId,
      updateData
    );

    res.json({
      success: true,
      message: "Profile Updated"
    });

  } catch (error) {

    res.json({
      success: false,
      message: error.message
    });

  }

};
const getProfile = async (req, res) => {

  try {

    const userData = await userModel
      .findById(req.userId)
      .select("-password");

    res.json({
      success: true,
      userData
    });

  } catch (error) {

    console.log(error);

    res.json({
      success: false,
      message: error.message
    });

  }

};
const bookAppointment = async (req, res) => {

  try {

    const { userId, docId, slotDate, slotTime } = req.body;

    const docData = await doctorModel.findById(docId).select('-password');

    if (!docData.available) {

      return res.json({
        success: false,
        message: "Doctor Not Available"
      });

    }

    const userData = await userModel
      .findById(req.userId)
      .select("-password");

    let slots_booked = docData.slots_booked;

    if (slots_booked[slotDate]) {

      if (slots_booked[slotDate].includes(slotTime)) {

        return res.json({
          success: false,
          message: "Slot Not Available"
        });

      }

      slots_booked[slotDate].push(slotTime);

    } else {

      slots_booked[slotDate] = []
      slots_booked[slotDate].push(slotTime)

    }

    const appointmentData = {

      userId: req.userId,

      docId,

      userData,

      docData,

      amount: docData.fees,

      slotTime,

      slotDate,

      date: Date.now()

    };

    const newAppointment =
      new appointmentModel(appointmentData);

    await newAppointment.save();

    await doctorModel.findByIdAndUpdate(
      docId,
      { slots_booked }
    );

    res.json({
      success: true,
      message: "Appointment Booked"
    });

  } catch (error) {

    console.log(error);

    res.json({
      success: false,
      message: error.message
    });

  }

};
const listAppointments = async (req, res) => {

  try {

    const appointments = await appointmentModel.find({
      userId: req.userId
    });

    res.json({
      success: true,
      appointments
    });

  } catch (error) {

    console.log(error);

    res.json({
      success: false,
      message: error.message
    });

  }

};
const cancelAppointment = async (req, res) => {

  try {

    const { appointmentId } = req.body;

    const appointmentData =
      await appointmentModel.findById(
        appointmentId
      );

    if (!appointmentData) {

      return res.json({
        success: false,
        message: "Appointment Not Found"
      });

    }

    await appointmentModel.findByIdAndUpdate(
      appointmentId,
      {
        cancelled: true
      }
    );

    const {
      docId,
      slotDate,
      slotTime
    } = appointmentData;

    const doctorData =
      await doctorModel.findById(docId);

    let slots_booked =
      doctorData.slots_booked;

    if (
      slots_booked[slotDate]
    ) {

      slots_booked[slotDate] =
        slots_booked[slotDate].filter(
          e => e !== slotTime
        );

    }

    await doctorModel.findByIdAndUpdate(
      docId,
      {
        slots_booked
      }
    );

    res.json({
      success: true,
      message:
        "Appointment Cancelled"
    });

  } catch (error) {

    console.log(error);

    res.json({
      success: false,
      message: error.message
    });

  }

};
const paymentRazorpay = async (
  req,
  res
) => {

  try {

    const {
      appointmentId
    } = req.body;

    const appointmentData =
      await appointmentModel.findById(
        appointmentId
      );

    if (
      !appointmentData ||
      appointmentData.cancelled
    ) {

      return res.json({
        success: false,
        message:
          "Appointment Cancelled"
      });

    }

    const options = {

      amount:
        appointmentData.amount * 100,

      currency: "INR",

      receipt:
        appointmentId

    };

    const order =
      await razorpay.orders.create(
        options
      );

    res.json({
      success: true,
      order
    });

  } catch (error) {

    console.log(error);

    res.json({
      success: false,
      message: error.message
    });

  }

};
const verifyRazorpay = async (
  req,
  res
) => {

  try {

    const {
      razorpay_order_id,
      appointmentId
    } = req.body;

    const orderInfo =
      await razorpay.orders.fetch(
        razorpay_order_id
      );

    if (
      orderInfo.status ===
      "paid"
    ) {

      await appointmentModel.findByIdAndUpdate(

        appointmentId,

        {
          payment: true
        }

      );

      res.json({
        success: true,
        message:
          "Payment Successful"
      });

    } else {

      res.json({
        success: false,
        message:
          "Payment Failed"
      });

    }

  } catch (error) {

    console.log(error);

    res.json({
      success: false,
      message: error.message
    });

  }

};
export { registerUser, loginUser, getProfile,updateProfile, bookAppointment , 
  listAppointments,cancelAppointment,paymentRazorpay ,verifyRazorpay};