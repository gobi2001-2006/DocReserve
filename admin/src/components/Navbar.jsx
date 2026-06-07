import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'
const Navbar = () => {
const { aToken, setAToken } = useContext(AdminContext)
const navigate=useNavigate()
const { dToken, setDToken } =useContext(DoctorContext)

const logout = () => {

  localStorage.removeItem('aToken')
  localStorage.removeItem('dToken')

  setAToken('')

  if (setDToken) {
    setDToken('')
  }

  navigate('/')

}

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>

      <div className='flex items-center gap-2'>
        <img
          className='w-36'
          src={assets.admin_logo}
          alt="Admin Logo"
        />

        <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-xs'>
          {aToken? 'Admin': dToken? 'Doctor': ''}
        </p>
      </div>
      <button
        onClick={logout}
        className='bg-primary text-white text-sm px-6 py-2 rounded-full'
      >
        Logout
      </button>
    </div>
  )
}

export default Navbar