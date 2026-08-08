import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const MyAppointments = () => {

  const {
    backendUrl,
    token,
    currencySymbol
  } = useContext(AppContext)

  const [appointments, setAppointments] = useState([])

  // Get Appointments
  const getAppointments = async () => {

    try {

      const { data } = await axios.get(

        backendUrl + "/api/user/appointments",

        {
          headers: { token }
        }

      )

      if (data.success) {

        setAppointments(data.appointments)

      } else {

        toast.error(data.message)

      }

    } catch (error) {

      console.log(error)

      toast.error(error.message)

    }

  }

  // Cancel Appointment
  const cancelAppointment = async (appointmentId) => {

    try {

      const { data } = await axios.post(

        backendUrl + "/api/user/cancel-appointment",

        {
          appointmentId
        },

        {
          headers: { token }
        }

      )

      if (data.success) {

        toast.success(data.message)

        getAppointments()

      } else {

        toast.error(data.message)

      }

    } catch (error) {

      console.log(error)

      toast.error(error.message)

    }

  }

  // Razorpay Popup
  const initPay = async (order, appointmentId) => {

    const options = {

      key: import.meta.env.VITE_RAZORPAY_KEY_ID,

      amount: order.amount,

      currency: order.currency,

      name: "DocReserve",

      description: "Appointment Payment",

      order_id: order.id,

      handler: async (response) => {

        try {

          const { data } = await axios.post(

            backendUrl +
            "/api/user/verify-razorpay",

            {
              razorpay_order_id:
                response.razorpay_order_id,

              appointmentId
            },

            {
              headers: { token }
            }

          )

          if (data.success) {

            toast.success(
              "Payment Successful"
            )

            getAppointments()

          } else {

            toast.error(
              data.message
            )

          }

        } catch (error) {

          console.log(error)

          toast.error(error.message)

        }

      }

    }

    const rzp =
      new window.Razorpay(options)

    rzp.open()

  }

  // Create Razorpay Order
  const paymentRazorpay = async (
    appointmentId
  ) => {

    try {

      const { data } = await axios.post(

        backendUrl +
        "/api/user/payment-razorpay",

        {
          appointmentId
        },

        {
          headers: { token }
        }

      )

      if (data.success) {

        initPay(
          data.order,
          appointmentId
        )

      } else {

        toast.error(
          data.message
        )

      }

    } catch (error) {

      console.log(error)

      toast.error(error.message)

    }

  }

  useEffect(() => {

    if (token) {

      getAppointments()

    }

  }, [token])

  return (

    <div className="px-4 md:px-10 my-10">

      <h2 className="text-xl font-semibold text-gray-700 mb-6">
        My Appointments
      </h2>

      <hr className="mb-6" />


      {

        appointments.length === 0 ? (

          <div className="text-center py-10">

            <p className="text-gray-500">
              No Appointments Found
            </p>

          </div>

        ) : (

          <div className="flex flex-col gap-6">

            {

              appointments.map((item) => (

                <div

                  key={item._id}

                  className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-6"

                >

                  {/* Doctor Details */}

                  <div className="flex gap-6">

                    <img

                      src={item.docData.image}

                      alt={item.docData.name}

                      className="w-32 h-32 object-contain bg-blue-50 rounded"

                    />

                    <div className="text-gray-600 flex flex-col gap-1">

                      <p className="text-lg font-semibold text-gray-800">
                        {item.docData.name}
                      </p>

                      <p>
                        {item.docData.speciality}
                      </p>

                      <p className="mt-2 font-medium text-gray-700">
                        Address:
                      </p>

                      <p>
                        {item.docData.address?.line1}
                      </p>

                      <p>
                        {item.docData.address?.line2}
                      </p>

                      <p className="mt-2">

                        <span className="font-medium">
                          Date:
                        </span>

                        {" "}
                        {item.slotDate}

                      </p>

                      <p>

                        <span className="font-medium">
                          Time:
                        </span>

                        {" "}
                        {item.slotTime}

                      </p>

                      <p>

                        <span className="font-medium">
                          Fees:
                        </span>

                        {" "}
                        {currencySymbol}
                        {item.amount}

                      </p>

                      <p
  className={
    item.cancelled
      ? "text-red-500 font-medium"
      : "text-green-500 font-medium"
  }
>

  {
    item.cancelled
      ? "Cancelled"
      : item.payment
      ? "Paid"
      : "Active"
  }

</p>

{/* Prescription Section */}

{
  item.prescription && (

    <div className="mt-3">

      <a

        href={item.prescription}

        target="_blank"

        rel="noreferrer"

        className="
        text-blue-600
        underline
        block
        "

      >

        View Prescription

      </a>

      <a

        href={item.prescription}

        download

        className="
        inline-block
        mt-2
        border
        border-blue-600
        text-blue-600
        px-4
        py-1
        rounded
        hover:bg-blue-50
        "

      >

        Download Prescription

      </a>

    </div>

  )
}

{
  item.prescriptionNotes && (

    <div className="mt-3">

      <p className="font-semibold text-gray-700">

        Doctor Notes

      </p>

      <p className="text-gray-600">

        {item.prescriptionNotes}

      </p>

    </div>

  )
}

                    </div>

                  </div>

                  {/* Buttons */}

                  <div className="flex flex-col gap-3 mt-4 md:mt-0">

                    {

                      !item.cancelled && !item.payment && (

                        <button

                          onClick={() =>
                            paymentRazorpay(
                              item._id
                            )
                          }

                          className="border border-blue-600 text-blue-600 px-6 py-2 rounded hover:bg-blue-50 transition"

                        >

                          Pay Online

                        </button>

                      )

                    }

                    {

                      item.payment && (

                        <button

                          disabled

                          className="border border-green-500 text-green-500 px-6 py-2 rounded cursor-not-allowed"

                        >

                          Paid

                        </button>

                      )

                    }

                    {

                      item.cancelled ? (

                        <button

                          disabled

                          className="border border-gray-400 text-gray-400 px-6 py-2 rounded cursor-not-allowed"

                        >

                          Cancelled

                        </button>

                      ) : (

                        <button

                          onClick={() =>
                            cancelAppointment(
                              item._id
                            )
                          }

                          className="border border-red-500 text-red-500 px-6 py-2 rounded hover:bg-red-50 transition"

                        >

                          Cancel Appointment

                        </button>

                      )

                    }

                  </div>

                </div>

              ))

            }

          </div>

        )

      }

    </div>

  )

}

export default MyAppointments;