import React, { useState, useContext } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const AddDoctor = () => {
  const { backendUrl, aToken } = useContext(AdminContext)

  const [docImg, setDocImg] = useState(null)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [experience, setExperience] = useState('1 Year')
  const [fees, setFees] = useState('')
  const [about, setAbout] = useState('')
  const [speciality, setSpeciality] = useState('General physician')
  const [degree, setDegree] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      if (!docImg) {
        return toast.error('Please select doctor image')
      }

      const formData = new FormData()

      // File
      formData.append('image', docImg)

      // Text fields
      formData.append('name', name)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('experience', experience)
      formData.append('fees', fees)
      formData.append('about', about)
      formData.append('speciality', speciality)
      formData.append('degree', degree)

      // Address JSON
      formData.append(
        'address',
        JSON.stringify({
          line1: address1,
          line2: address2
        })
      )

      const { data } = await axios.post(
        backendUrl + '/api/admin/add-doctor',
        formData,
        {
          headers: {
            atoken: aToken   // FIXED
          }
        }
      )

      console.log(data)

      if (data.success) {
        toast.success(data.message)

        // Reset form
        setDocImg(null)
        setName('')
        setEmail('')
        setPassword('')
        setExperience('1 Year')
        setFees('')
        setAbout('')
        setSpeciality('General physician')
        setDegree('')
        setAddress1('')
        setAddress2('')
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='m-5 w-full'>

      <p className='mb-3 text-lg font-medium'>Add Doctor</p>

      <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl'>

        {/* Upload Image */}
        <div className='flex items-center gap-4 mb-8 text-gray-500'>
          <label htmlFor="doc-img">
            <img
              className='w-16 h-16 bg-gray-100 rounded-full cursor-pointer object-cover'
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt="upload"
            />
          </label>

          <input
            type="file"
            id="doc-img"
            hidden
            accept="image/*"
            onChange={(e) => setDocImg(e.target.files[0])}
          />

          <p>
            Upload doctor <br /> picture
          </p>
        </div>

        <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>

          {/* Left */}
          <div className='w-full lg:flex-1 flex flex-col gap-4'>

            <div>
              <p>Your Name</p>
              <input
                type="text"
                placeholder='Name'
                className='border rounded px-3 py-2 w-full'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <p>Your Email</p>
              <input
                type="email"
                placeholder='Your email'
                className='border rounded px-3 py-2 w-full'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <p>Your Password</p>
              <input
                type="password"
                placeholder='Password'
                className='border rounded px-3 py-2 w-full'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <p>Experience</p>
              <select
                className='border rounded px-3 py-2 w-full'
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              >
                <option>1 Year</option>
                <option>2 Years</option>
                <option>3 Years</option>
                <option>4 Years</option>
                <option>5 Years</option>
                <option>10 Years</option>
              </select>
            </div>

            <div>
              <p>Fees</p>
              <input
                type="number"
                placeholder='Your fees'
                className='border rounded px-3 py-2 w-full'
                value={fees}
                onChange={(e) => setFees(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Right */}
          <div className='w-full lg:flex-1 flex flex-col gap-4'>

            <div>
              <p>Speciality</p>
              <select
                className='border rounded px-3 py-2 w-full'
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
              >
                <option>General physician</option>
                <option>Gynecologist</option>
                <option>Dermatologist</option>
                <option>Pediatricians</option>
                <option>Neurologist</option>
                <option>Gastroenterologist</option>
              </select>
            </div>

            <div>
              <p>Education</p>
              <input
                type="text"
                placeholder='Education'
                className='border rounded px-3 py-2 w-full'
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                required
              />
            </div>

            <div>
              <p>Address</p>
              <input
                type="text"
                placeholder='Address 1'
                className='border rounded px-3 py-2 w-full mb-2'
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                required
              />

              <input
                type="text"
                placeholder='Address 2'
                className='border rounded px-3 py-2 w-full'
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        {/* About */}
        <div className='mt-6'>
          <p>About Me</p>
          <textarea
            rows={5}
            placeholder='Write about yourself'
            className='w-full px-4 pt-2 border rounded'
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className='bg-[#0B5ED7] px-10 py-3 mt-6 text-white rounded-full'
        >
          Add Doctor
        </button>

      </div>
    </form>
  )
}

export default AddDoctor