import express from 'express'

import {
  addDoctor,
  allDoctors,
  loginAdmin,
  adminDashboard,
  appointmentsAdmin
} from "../controllers/adminController.js"

import upload from "../middlewares/multer.js"
import authAdmin from '../middlewares/authAdmin.js'
import { changeAvailability } from '../controllers/doctorController.js'

const adminRouter = express.Router()

// Dashboard
adminRouter.get(
  "/dashboard",
  authAdmin,
  adminDashboard
)

// All Appointments
adminRouter.get(
  "/appointments",
  authAdmin,
  appointmentsAdmin
)

// Add Doctor
adminRouter.post(
  '/add-doctor',
  authAdmin,
  upload.single("image"),
  addDoctor
)

// Login
adminRouter.post(
  '/login',
  loginAdmin
)

// Doctors
adminRouter.post(
  '/all-doctors',
  authAdmin,
  allDoctors
)

adminRouter.post(
  '/change-availability',
  authAdmin,
  changeAvailability
)

export default adminRouter