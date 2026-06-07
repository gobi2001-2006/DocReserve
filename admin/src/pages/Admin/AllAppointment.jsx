import React,
{
 useContext,
 useEffect
}
from 'react'

import {
 AdminContext
}
from '../../context/AdminContext'

const AllAppointment = () => {

 const {
  appointments,
  getAllAppointments
 } = useContext(AdminContext)

 useEffect(() => {

  getAllAppointments()

 }, [])

 return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden">

  <div className="p-5 border-b">

    <h2 className="text-2xl font-semibold">
      All Appointments
    </h2>

  </div>

  <div className="overflow-x-auto">

    <table className="w-full">

      <thead className="bg-gray-100">

        <tr>

          <th className="text-left p-4">
            Patient
          </th>

          <th className="text-left p-4">
            Doctor
          </th>

          <th className="text-left p-4">
            Date
          </th>

          <th className="text-left p-4">
            Time
          </th>

          <th className="text-left p-4">
            Amount
          </th>

          <th className="text-left p-4">
            Status
          </th>

        </tr>

      </thead>

      <tbody>

        {appointments?.map((item, index) => (

          <tr
            key={index}
            className="border-b hover:bg-gray-50"
          >

            <td className="p-4">
              {item.userData?.name}
            </td>

            <td className="p-4 font-medium">
              {item.docData?.name}
            </td>

            <td className="p-4">
              {item.slotDate}
            </td>

            <td className="p-4">
              {item.slotTime}
            </td>

            <td className="p-4 font-semibold">
              ₹{item.amount}
            </td>

            <td className="p-4">

              {item.cancelled ? (

                <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-sm">
                  Cancelled
                </span>

              ) : item.payment ? (

                <span className="px-3 py-1 rounded-full bg-green-100 text-green-600 text-sm">
                  Paid
                </span>

              ) : (

                <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm">
                  Pending
                </span>

              )}

            </td>

          </tr>

        ))}

      </tbody>

    </table>

  </div>

</div>

 )

}

export default AllAppointment