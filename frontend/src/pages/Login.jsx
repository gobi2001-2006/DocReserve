import React, { useState } from 'react'

const Login = () => {

  const [isSignup, setIsSignup] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    if (isSignup) {
      console.log("Signup Data:", { name, email, password })
    } else {
      console.log("Login Data:", { email, password })
    }

    setName('')
    setEmail('')
    setPassword('')
  }

  return (
    <form
      onSubmit={onSubmitHandler}
      className='min-h-[100vh] flex items-center justify-center bg-gray-100'
    >
      <div className='flex flex-col gap-4 p-8 w-[350px] bg-white rounded-2xl shadow-xl text-sm'>

        <h2 className='text-2xl font-bold text-center text-gray-800'>
          {isSignup ? "Create Account" : "Login"}
        </h2>

        <p className='text-center text-gray-500'>
          {isSignup ? "Sign up to continue" : "Login to your account"}
        </p>

        {/* Full Name Field */}
        {isSignup && (
          <div>
            <label className='block mb-1 font-medium'>Full Name</label>
            <input
              type="text"
              className='w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}

        {/* Email Field */}
        <div>
          <label className='block mb-1 font-medium'>Email</label>
          <input
            type="email"
            className='w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password Field */}
        <div>
          <label className='block mb-1 font-medium'>Password</label>
          <div className='relative'>
            <input
              type={showPassword ? "text" : "password"}
              className='w-full border rounded-md p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className='absolute right-3 top-2 cursor-pointer text-gray-500 text-sm'
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className='bg-blue-600 hover:bg-blue-700 transition-all text-white py-2 rounded-md text-base font-medium'
        >
          {isSignup ? "Create Account" : "Login"}
        </button>

        {/* Toggle Section */}
        <p className='text-center text-gray-600'>
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            onClick={() => setIsSignup(!isSignup)}
            className='text-blue-600 cursor-pointer font-medium hover:underline'
          >
            {isSignup ? "Login" : "Sign Up"}
          </span>
        </p>

      </div>
    </form>
  )
}

export default Login
