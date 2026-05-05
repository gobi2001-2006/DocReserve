import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

function Navbar() {

  const navigate = useNavigate()

  const [token, setToken] = useState(true)
  const [showMenu, setShowMenu] = useState(false)

  const navClass = ({ isActive }) =>
    isActive ? 'text-blue-600' : 'text-gray-700'

  return (
    <div className="flex items-center justify-between px-6 py-4">

      {/* Logo */}
      <img
        onClick={() => navigate('/')}
        className="cursor-pointer h-20"
        src="/logo1.svg"
        alt="DocReserve"
      />

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center gap-6 font-medium">

        <NavLink to="/" className={navClass}>
          <li className="py-1">HOME</li>
        </NavLink>

        <NavLink to="/doctors" className={navClass}>
          <li className="py-1">ALL DOCTORS</li>
        </NavLink>

        <NavLink to="/about" className={navClass}>
          <li className="py-1">ABOUT</li>
        </NavLink>

        <NavLink to="/contact" className={navClass}>
          <li className="py-1">CONTACT</li>
        </NavLink>

      </ul>

      {/* Right Section */}
      <div className="flex items-center gap-4">

        {token ? (

          <div className="flex items-center gap-2 cursor-pointer group relative">

            <img
              className="w-8 rounded-full"
              src={assets.profile_pic}
              alt="Profile"
            />

            <img
              className="w-2.5"
              src={assets.dropdown_icon}
              alt="Dropdown"
            />

            {/* Dropdown */}
            <div className="absolute right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">

              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">

                <p
                  onClick={() => navigate('/my-profile')}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>

                <p
                  onClick={() => navigate('/my-appointment')}
                  className="hover:text-black cursor-pointer"
                >
                  My Appointments
                </p>

                <p
                  onClick={() => setToken(false)}
                  className="hover:text-black cursor-pointer"
                >
                  Logout
                </p>

              </div>

            </div>

          </div>

        ) : (

          <button
            onClick={() => navigate('/login')}
            className="bg-blue-600 text-white px-8 py-3 rounded-full"
          >
            Create Account
          </button>

        )}

        {/* Mobile Menu Button */}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden"
          src={assets.menu_icon}
          alt="Menu"
        />

        {/* Mobile Menu */}
        <div
          className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'}
          md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}
        >

          <div className="flex items-center justify-between px-5 py-6">

            <img className="w-36" src={assets.logo} alt="Logo" />

            <img
              className="w-7"
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
              alt="Close"
            />

          </div>

          <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">

            <NavLink className="px-4 py-2 rounded inline-block" to="/">
              <p>HOME</p>
            </NavLink>

            <NavLink className="px-4 py-2 rounded inline-block" to="/doctors">
              <p>ALL DOCTORS</p>
            </NavLink>

            <NavLink className="px-4 py-2 rounded inline-block" to="/about">
              <p>ABOUT</p>
            </NavLink>

            <NavLink className="px-4 py-2 rounded inline-block" to="/contact">
              <p>CONTACT</p>
            </NavLink>

          </ul>

        </div>

      </div>

    </div>
  )
}

export default Navbar