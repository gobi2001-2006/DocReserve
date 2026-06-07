import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'

import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'

const Sidebar = () => {

  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)

  const navClass = ({ isActive }) =>
    `flex items-center gap-3 py-3 px-5 md:px-9 md:min-w-72 cursor-pointer ${
      isActive
        ? 'bg-[#F2F3FF] border-r-4 border-[#0B5ED7]'
        : ''
    }`

  return (

    <div className='min-h-screen bg-white border-r'>

      {/* ADMIN SIDEBAR */}

      {aToken && (

        <ul className='text-[#515151] mt-5'>

          <li>
            <NavLink
              to='/admin-dashboard'
              className={navClass}
            >
              <img src={assets.home_icon} alt="" />
              <p>Dashboard</p>
            </NavLink>
          </li>

          <li>
            <NavLink
              to='/all-appointments'
              className={navClass}
            >
              <img src={assets.appointment_icon} alt="" />
              <p>Appointments</p>
            </NavLink>
          </li>

          <li>
            <NavLink
              to='/add-doctor'
              className={navClass}
            >
              <img src={assets.add_icon} alt="" />
              <p>Add Doctor</p>
            </NavLink>
          </li>

          <li>
            <NavLink
              to='/doctor-list'
              className={navClass}
            >
              <img src={assets.people_icon} alt="" />
              <p>Doctor List</p>
            </NavLink>
          </li>

        </ul>

      )}

      {/* DOCTOR SIDEBAR */}

      {dToken && (

        <ul className='text-[#515151] mt-5'>

          <li>
            <NavLink
              to='/doctor-dashboard'
              className={navClass}
            >
              <img src={assets.home_icon} alt="" />
              <p>Dashboard</p>
            </NavLink>
          </li>

          <li>
            <NavLink
              to='/doctor-appointments'
              className={navClass}
            >
              <img src={assets.appointment_icon} alt="" />
              <p>Appointments</p>
            </NavLink>
          </li>

          <li>
            <NavLink
              to='/doctor-profile'
              className={navClass}
            >
              <img src={assets.people_icon} alt="" />
              <p>My Profile</p>
            </NavLink>
          </li>

        </ul>

      )}

    </div>

  )

}

export default Sidebar