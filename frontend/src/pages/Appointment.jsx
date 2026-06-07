import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const Appointment = () => {

  const { docId } = useParams()
  const navigate = useNavigate()

  const {
    doctors,
    currencySymbol,
    backendUrl,
    token,
    getDoctorsData
  } = useContext(AppContext)

  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')
  const [relatedDoctors, setRelatedDoctors] = useState([])
  const [loading, setLoading] = useState(false);

  // Get doctor info
  useEffect(() => {

    const doctor = doctors.find(
      doc => doc._id === docId
    )

    setDocInfo(doctor)

  }, [doctors, docId])

  // Generate slots
  const getAvailableSlots = () => {

    setDocSlots([])

    const today = new Date()

    for (let i = 0; i < 7; i++) {

      let currentDate = new Date(today)

      currentDate.setDate(
        today.getDate() + i
      )

      let endTime = new Date(currentDate)

      endTime.setHours(21, 0, 0, 0)

      if (i === 0) {

        currentDate.setHours(
          currentDate.getHours() < 10
            ? 10
            : currentDate.getHours() + 1
        )

        currentDate.setMinutes(0)

      } else {

        currentDate.setHours(10)
        currentDate.setMinutes(0)

      }

      let timeSlots = []

      while (currentDate < endTime) {

        timeSlots.push({

          datetime: new Date(currentDate),

          time: currentDate.toLocaleTimeString(
            [],
            {
              hour: '2-digit',
              minute: '2-digit'
            }
          )

        })

        currentDate.setMinutes(
          currentDate.getMinutes() + 30
        )

      }

      setDocSlots(prev => [
        ...prev,
        timeSlots
      ])

    }

  }

  // Book appointment
  const bookAppointment = async () => {

    if (!token) {

      toast.warning(
        'Login to book appointment'
      )

      navigate('/login')

      return

    }
    if (!slotTime) {

    toast.warning('Please select a time slot');

    return;

  }

  if (loading) return;

  setLoading(true);

    try {

      const date =
        docSlots[slotIndex][0].datetime

      const day = date.getDate()

      const month =
        date.getMonth() + 1

      const year =
        date.getFullYear()

      const slotDate =
        day + "_" + month + "_" + year

      const { data } = await axios.post(

        backendUrl +
          '/api/user/book-appointment',

        {
          docId,
          slotDate,
          slotTime
        },

        {
          headers: { token }
        }

      )

      if (data.success) {

        toast.success(
          data.message
        )

        getDoctorsData()

        navigate('/my-appointments')

      } else {

        toast.error(
          data.message
        )

      }

    } catch (error) {

      console.log(error)

      toast.error(
        error.message
      )

    }
    finally {

    setLoading(false);

  }

  }

  useEffect(() => {

    if (docInfo) {

      getAvailableSlots()

    }

  }, [docInfo])

  useEffect(() => {

    if (docInfo) {

      const related =
        doctors.filter(

          doc =>

            doc.speciality ===
              docInfo.speciality &&

            doc._id !== docInfo._id

        )

      setRelatedDoctors(
        related.slice(0, 4)
      )

    }

  }, [docInfo, doctors])

  if (!docInfo) {

    return (
      <div className="text-center py-20">
        Loading...
      </div>
    )

  }
  

  return (

    <div className="px-4 md:px-10 my-10">

      <div className="flex flex-col sm:flex-row gap-8">

        {/* Doctor Image */}

        <div className="sm:w-1/3">

          <img
            src={docInfo.image}
            alt={docInfo.name}
            className="w-full rounded-xl bg-blue-50 p-6"
          />

        </div>

        {/* Doctor Details */}

        <div className="sm:w-2/3 border border-gray-200 rounded-xl p-6">

          <p className="text-2xl font-semibold flex items-center gap-2">

            {docInfo.name}

            <img
              src={assets.verified_icon}
              alt=""
              className="w-5"
            />

          </p>

          <div className="flex items-center gap-4 mt-2">

            <p className="text-gray-600">

              {docInfo.degree} · {docInfo.speciality}

            </p>

            <span className="border px-3 py-1 rounded-full text-sm">

              {docInfo.experience}

            </span>

          </div>

          <p className="mt-4 text-gray-600">

            Appointment Fee :

            <span className="font-semibold ml-2">

              {currencySymbol}
              {docInfo.fees}

            </span>

          </p>

          <div className="mt-6">

            <p className="font-medium flex items-center gap-2">

              About

              <img
                src={assets.info_icon}
                alt=""
                className="w-4"
              />

            </p>

            <p className="text-sm text-gray-500 mt-2">

              {docInfo.about}

            </p>

          </div>

          {/* Date Selection */}

          <div className="mt-8">

            <p className="font-medium">

              Available Slots

            </p>

            <div className="flex gap-2 overflow-x-auto mt-3">

              {docSlots.map(
                (item, index) => (

                  <button
                    key={index}
                    onClick={() => {

                      setSlotIndex(index)

                      setSlotTime('')

                    }}
                    className={`px-4 py-2 rounded-full border ${
                      slotIndex === index
                        ? 'bg-blue-600 text-white'
                        : ''
                    }`}
                  >

                    Day {index + 1}

                  </button>

                )
              )}

            </div>

            {/* Time Slots */}

            <div className="flex flex-wrap gap-3 mt-4">

              {docSlots[slotIndex]?.map(
                (slot, index) => (

                  <button
                    key={index}
                    onClick={() =>
                      setSlotTime(
                        slot.time
                      )
                    }
                    className={`px-4 py-2 rounded-full border ${
                      slotTime === slot.time
                        ? 'bg-blue-600 text-white'
                        : ''
                    }`}
                  >

                    {slot.time}

                  </button>

                )
              )}

            </div>

          </div>

          {/* Book Button */}

          <button

  onClick={bookAppointment}

  disabled={
    !slotTime || loading
  }

  className={`mt-6 px-6 py-3 rounded-full text-white transition-all

  ${
    slotTime && !loading

      ? 'bg-blue-600 hover:bg-blue-700'

      : 'bg-gray-400 cursor-not-allowed'

  }`}

>

  {

    loading

      ? "Booking..."

      : "Book Appointment"

  }

</button>

        

        </div>

      </div>

    </div>

  )

}

export default Appointment