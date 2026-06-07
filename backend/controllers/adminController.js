import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";
import fs from "fs";
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";

// Add Doctor
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees
    } = req.body;

    const imageFile = req.file;

    console.log("BODY:", req.body);
    console.log("FILE:", imageFile);

    // Validation
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees
    ) {
      return res.json({
        success: false,
        message: "All fields are required"
      });
    }

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Invalid email"
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be at least 8 characters"
      });
    }

    if (!imageFile) {
      return res.json({
        success: false,
        message: "Doctor image is required"
      });
    }

    if (!fs.existsSync(imageFile.path)) {
      return res.json({
        success: false,
        message: "Uploaded file not found"
      });
    }

    // Check if doctor already exists
    const exists = await doctorModel.findOne({ email });
    if (exists) {
      return res.json({
        success: false,
        message: "Doctor already exists"
      });
    }

    // Address parsing
    let parsedAddress;

    if (req.body.address) {
      try {
        parsedAddress = JSON.parse(req.body.address);
      } catch {
        return res.json({
          success: false,
          message: "Invalid address JSON format"
        });
      }
    } else {
      return res.json({
        success: false,
        message: "Address is required"
      });
    }

    // Password hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Upload image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(
      imageFile.path,
      {
        folder: "doctors",
        resource_type: "image"
      }
    );

    const imageUrl = uploadResult.secure_url;

    // Doctor data
    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees: Number(fees),
      address: parsedAddress,
      available: true,
      date: Date.now()
    };

    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    // Delete local file after upload
    fs.unlinkSync(imageFile.path);

    res.json({
      success: true,
      message: "Doctor Added Successfully"
    });

  } catch (error) {
    console.error("Add Doctor Error:", error);

    res.json({
      success: false,
      message: error.message
    });
  }
};

// Admin Login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      // FIXED JWT
      const token = jwt.sign(
        { email },
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

// Get All Doctors
const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password");

    res.json({
      success: true,
      doctors
    });

  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message
    });
  }
};
const adminDashboard = async (req,res)=>{

    try{

        const doctors = await doctorModel.find({});
        const users = await userModel.find({});
        const appointments = await appointmentModel.find({});

        const dashData = {

            doctors : doctors.length,

            patients : users.length,

            appointments : appointments.length,

            latestAppointments :
                appointments.reverse().slice(0,5)

        }

        res.json({
            success:true,
            dashData
        })

    }
    catch(error){

        console.log(error)

        res.json({
            success:false,
            message:error.message
        })

    }

}
const appointmentsAdmin = async (req,res)=>{

    try{

        const appointments =
            await appointmentModel.find({})

        res.json({
            success:true,
            appointments
        })

    }
    catch(error){

        console.log(error)

        res.json({
            success:false,
            message:error.message
        })

    }

}

export { addDoctor, loginAdmin, allDoctors,adminDashboard,appointmentsAdmin};