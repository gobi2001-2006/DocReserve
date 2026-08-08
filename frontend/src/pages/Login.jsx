import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

  const { backendUrl, setToken } = useContext(AppContext)

  const navigate = useNavigate()

  const [isSignup, setIsSignup] = useState(true)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const [showPassword, setShowPassword] = useState(false)

  const onSubmitHandler = async (event) => {

    event.preventDefault()

    try {

      if (isSignup) {

        // Register API
        const { data } = await axios.post(
          backendUrl + "/api/user/register",
          {
            name,
            email,
            password
          }
        )

        if (data.success) {

          localStorage.setItem("token", data.token)

          setToken(data.token)

          toast.success("Account Created Successfully")

          navigate('/')

        } else {

          toast.error(data.message)

        }

      } else {

        // Login API
        const { data } = await axios.post(
          backendUrl + "/api/user/login",
          {
            email,
            password
          }
        )

        if (data.success) {

          localStorage.setItem("token", data.token)

          setToken(data.token)

          toast.success("Login Successful")

          navigate('/')

        } else {

          toast.error(data.message)

        }

      }

      setName('')
      setEmail('')
      setPassword('')

    } catch (error) {

      console.log(error)

      toast.error(error.message)

    }

  }

  return (

    <form
      onSubmit={onSubmitHandler}
      className='min-h-[100vh] flex items-center justify-center bg-gray-100'
    >

      <div
        className='flex flex-col gap-4 p-8 w-[350px]
        bg-white rounded-2xl shadow-xl text-sm'
      >

        <h2 className='text-2xl font-bold text-center text-gray-800'>

          {isSignup ? "Create Account" : "Login"}

        </h2>

        <p className='text-center text-gray-500'>

          {isSignup
            ? "Sign up to continue"
            : "Login to your account"}

        </p>

        {/* Full Name */}
        {isSignup && (

          <div>

            <label className='block mb-1 font-medium'>
              Full Name
            </label>

            <input
              type="text"
              className='w-full border rounded-md p-2
              focus:outline-none focus:ring-2 focus:ring-blue-500'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

          </div>

        )}

        {/* Email */}
        <div>

          <label className='block mb-1 font-medium'>
            Email
          </label>

          <input
            type="email"
            className='w-full border rounded-md p-2
            focus:outline-none focus:ring-2 focus:ring-blue-500'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

        </div>

        {/* Password */}
        <div>

          <label className='block mb-1 font-medium'>
            Password
          </label>

          <div className='relative'>

            <input
              type={showPassword ? "text" : "password"}
              className='w-full border rounded-md p-2 pr-10
              focus:outline-none focus:ring-2 focus:ring-blue-500'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className='absolute right-3 top-2 cursor-pointer
              text-gray-500 text-sm'
            >

              {showPassword ? "Hide" : "Show"}

            </span>

          </div>

        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className='bg-blue-600 hover:bg-blue-700 transition-all
          text-white py-2 rounded-md text-base font-medium'
        >

          {isSignup ? "Create Account" : "Login"}

        </button>

        {/* Toggle */}
        <p className='text-center text-gray-600'>

          {isSignup
            ? "Already have an account?"
            : "Don't have an account?"}

          {" "}

          <span
            onClick={() => setIsSignup(!isSignup)}
            className='text-blue-600 cursor-pointer
            font-medium hover:underline'
          >

            {isSignup ? "Login" : "Sign Up"}

          </span>

        </p>

      </div>

    </form>

  )

}

export default Login;