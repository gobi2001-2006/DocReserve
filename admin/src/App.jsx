import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import Login from './pages/Login'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'

import { AdminContext } from './context/AdminContext'
import { DoctorContext } from './context/DoctorContext'

import AddDoctor from './pages/Admin/AddDoctor'
import Dashboard from './pages/Admin/Dashboard'
import AllAppointment from './pages/Admin/AllAppointment'
import DoctorsList from './pages/Admin/DoctorsList'

import DoctorDashboard from './pages/Doctor/DoctorDashboard'
import DoctorAppointments from './pages/Doctor/DoctorAppointments'
import DoctorProfile from './pages/Doctor/DoctorProfile'

const App = () => {

  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)

  // ADMIN PANEL
  if (aToken) {

    return (

      <div className='bg-[#F8F9FD] min-h-screen'>

        <Navbar />

        <div className='flex items-start'>

          <Sidebar />

          <div className='flex-1 p-5'>

            <Routes>

              <Route
                path='/'
                element={
                  <Navigate to='/admin-dashboard' />
                }
              />

              <Route
                path='/admin-dashboard'
                element={<Dashboard />}
              />

              <Route
                path='/all-appointments'
                element={<AllAppointment />}
              />

              <Route
                path='/doctor-list'
                element={<DoctorsList />}
              />

              <Route
                path='/add-doctor'
                element={<AddDoctor />}
              />

            </Routes>

          </div>

        </div>

      </div>

    )

  }

  // DOCTOR PANEL
  if (dToken) {

    return (

      <div className='bg-[#F8F9FD] min-h-screen'>

        <Navbar />

        <div className='flex items-start'>

          <Sidebar />

          <div className='flex-1 p-5'>

            <Routes>

              <Route
                path='/'
                element={
                  <Navigate
                    to='/doctor-dashboard'
                  />
                }
              />

              <Route
                path='/doctor-dashboard'
                element={<DoctorDashboard />}
              />

              <Route
                path='/doctor-appointments'
                element={<DoctorAppointments />}
              />

              <Route
                path='/doctor-profile'
                element={<DoctorProfile />}
              />

            </Routes>

          </div>

        </div>

      </div>

    )

  }

  return <Login />

}

export default App