import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'

const Appointment = () => {
  const { docId } = useParams()
  const navigate = useNavigate()
  const { doctors, currencySymbol } = useContext(AppContext)

  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')
  const [relatedDoctors, setRelatedDoctors] = useState([])

  /* ---------------- Doctor Info ---------------- */
  useEffect(() => {
    const doc = doctors.find(doc => doc._id === docId)
    setDocInfo(doc)
  }, [doctors, docId])

  const getAvailableSlots = () => {
    setDocSlots([])
    const today = new Date()

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      let endTime = new Date(currentDate)
      endTime.setHours(21, 0, 0, 0)

      if (i === 0) {
        currentDate.setHours(
          currentDate.getHours() < 10 ? 10 : currentDate.getHours() + 1
        )
        currentDate.setMinutes(0)
      } else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      let timeSlots = []

      while (currentDate < endTime) {
        timeSlots.push({
          time: currentDate.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        })
        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }

      setDocSlots(prev => [...prev, timeSlots])
    }
  }

  useEffect(() => {
    if (docInfo) getAvailableSlots()
  }, [docInfo])

  useEffect(() => {
    if (docInfo) {
      const related = doctors.filter(
        doc =>
          doc.speciality === docInfo.speciality &&
          doc._id !== docInfo._id
      )
      setRelatedDoctors(related.slice(0, 4))
    }
  }, [docInfo, doctors])

  if (!docInfo) return null

  return (
    <div className="px-4 md:px-10 my-10">
      <div className="flex flex-col sm:flex-row gap-8">
        <div className="sm:w-1/3">
          <img
            src={docInfo.image}
            alt={docInfo.name}
            className="w-full rounded-xl bg-blue-50 p-6"
          />
        </div>

        <div className="sm:w-2/3 border border-gray-200 rounded-xl p-6">

          <p className="text-2xl font-semibold flex items-center gap-2">
            {docInfo.name}
            <img src={assets.verified_icon} alt="Verified" className="w-5" />
          </p>

          <div className="flex items-center gap-4 mt-2">
            <p className="text-gray-600">
              {docInfo.degree} · {docInfo.speciality}
            </p>
            <span className="text-sm border px-3 py-1 rounded-full">
              {docInfo.experience}
            </span>
          </div>

          <p className="text-gray-500 font-medium mt-4">
            Appointment Fee:{' '}
            <span className="font-semibold text-gray-700">
              {currencySymbol}{docInfo.fees}
            </span>
          </p>

          <div className="mt-6">
            <p className="font-medium flex items-center gap-2 mb-2">
              About
              <img src={assets.info_icon} alt="Info" className="w-4" />
            </p>
            <p className="text-sm text-gray-600 leading-6">
              {docInfo.about}
            </p>
          </div>

          <div className="mt-6">
            <p className="font-medium mb-3">Available Slots</p>

            <div className="flex gap-2 overflow-x-auto">
              {docSlots.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSlotIndex(index)
                    setSlotTime('')
                  }}
                  className={`px-4 py-2 rounded-full border text-sm
                    ${slotIndex === index
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-600'}
                  `}
                >
                  Day {index + 1}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mt-4">
              {docSlots[slotIndex]?.map((slot, index) => (
                <button
                  key={index}
                  onClick={() => setSlotTime(slot.time)}
                  className={`px-4 py-2 rounded-full border text-sm
                    ${slotTime === slot.time
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-600'}
                  `}
                >
                  {slot.time}
                </button>
              ))}
            </div>
          </div>

          <button
            disabled={!slotTime}
            className={`mt-6 px-6 py-3 rounded-full text-white
              ${slotTime
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-400 cursor-not-allowed'}
            `}
          >
            Book Appointment
          </button>

        </div>
      </div>

      {relatedDoctors.length > 0 && (
        <div className="mt-16">
          <h2 className="text-xl font-semibold mb-6">
            Related Doctors
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedDoctors.map((doc, index) => (
              <div
                key={index}
                onClick={() => navigate(`/appointment/${doc._id}`)}
                className="bg-blue-50 border border-blue-200 rounded-xl cursor-pointer
                           hover:-translate-y-2 hover:shadow-lg transition-all"
              >
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="w-full h-48 object-contain p-4"
                />

                <div className="bg-white p-4">
                  <div className="flex items-center gap-2 text-green-500 text-sm mb-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Available
                  </div>

                  <p className="font-medium">{doc.name}</p>
                  <p className="text-sm text-gray-500">{doc.speciality}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}

export default Appointment 