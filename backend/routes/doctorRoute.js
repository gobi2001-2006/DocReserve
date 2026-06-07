import express from 'express'

import {
  doctorList,
  loginDoctor,
  doctorDashboard,
  doctorAppointments,
  doctorProfile,
  updateDoctorProfile,
  completeAppointment,uploadPrescription
}
from '../controllers/doctorController.js'

import authDoctor from '../middlewares/authDoctor.js'
import upload from "../middlewares/multer.js"

const doctorRouter = express.Router()

// Public
doctorRouter.get('/list', doctorList)
doctorRouter.post('/login', loginDoctor)

// Protected
doctorRouter.get(
  '/dashboard',
  authDoctor,
  doctorDashboard
)

doctorRouter.post(
  "/upload-prescription",
  authDoctor,
  upload.single("prescription"),
  uploadPrescription
)

doctorRouter.get(
  '/appointments',
  authDoctor,
  doctorAppointments
)

doctorRouter.get(
  '/profile',
  authDoctor,
  doctorProfile
)

doctorRouter.post(
  '/update-profile',
  authDoctor,
  updateDoctorProfile
)

doctorRouter.post(
  '/complete-appointment',
  authDoctor,
  completeAppointment
)

export default doctorRouter