import express from 'express'

import {
  doctorList,
  loginDoctor,
  doctorDashboard,
  doctorAppointments,
  doctorProfile,
  updateDoctorProfile,
  completeAppointment
}
from '../controllers/doctorController.js'

import authDoctor from '../middlewares/authDoctor.js'

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