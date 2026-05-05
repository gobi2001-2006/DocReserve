import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const MyAppointments = () => {
  const { doctors } = useContext(AppContext)

  return (
    <div className="px-4 md:px-10 my-10">

      {/* Heading */}
      <h2 className="text-xl font-semibold text-gray-700 mb-6">
        My Appointments
      </h2>

      <hr className="mb-6" />

      <div className="flex flex-col gap-6">
        {doctors.slice(0, 2).map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-6"
          >

            {/* Left Section */}
            <div className="flex gap-6">

              {/* Doctor Image */}
              <img
                src={item.image}
                alt={item.name}
                className="w-32 h-32 object-contain bg-blue-50 rounded"
              />

              {/* Doctor Details */}
              <div className="text-gray-600 flex flex-col gap-1">
                <p className="text-lg font-semibold text-gray-800">
                  {item.name}
                </p>
                <p>{item.speciality}</p>

                <p className="mt-2 font-medium text-gray-700">
                  Address:
                </p>
                <p>{item.address.line1}</p>
                <p>{item.address.line2}</p>

                <p className="mt-2">
                  <span className="font-medium text-gray-700">
                    Date & Time:
                  </span>{" "}
                  25 July, 2024 | 8:30 PM
                </p>
              </div>
            </div>

            {/* Right Section (Buttons) */}
            <div className="flex flex-col gap-3 mt-4 md:mt-0">

              <button className="border border-blue-600 text-blue-600 px-6 py-2 rounded hover:bg-blue-50 transition">
                Pay Online
              </button>

              <button className="border border-red-500 text-red-500 px-6 py-2 rounded hover:bg-red-50 transition">
                Cancel Appointment
              </button>

            </div>

          </div>
        ))}
      </div>

    </div>
  )
}

export default MyAppointments