import React, {
  useContext,
  useEffect,
  useState
} from "react";

import axios from "axios";
import { toast } from "react-toastify";

import {
  DoctorContext
} from "../../context/DoctorContext";

const DoctorAppointments = () => {

  const {
    backendUrl,
    dToken,
    appointments,
    setAppointments
  } = useContext(DoctorContext);

  const [files, setFiles] = useState({});
  const [notes, setNotes] = useState({});

  const getAppointments = async () => {

    try {

      const { data } = await axios.get(

        backendUrl +
        "/api/doctor/appointments",

        {
          headers: {
            dtoken: dToken
          }
        }

      );

      if (data.success) {

        setAppointments(
          data.appointments
        );

      }

    } catch (error) {

      console.log(error);

      toast.error(
        error.message
      );

    }

  };

  const completeAppointment = async (
    appointmentId
  ) => {

    try {

      const { data } =
        await axios.post(

          backendUrl +
          "/api/doctor/complete-appointment",

          {
            appointmentId
          },

          {
            headers: {
              dtoken: dToken
            }
          }

        );

      if (data.success) {

        toast.success(
          data.message
        );

        getAppointments();

      }

    } catch (error) {

      toast.error(
        error.message
      );

    }

  };

  const uploadPrescription = async (
    appointmentId
  ) => {

    try {

      if (!files[appointmentId]) {

        toast.error(
          "Please select a file"
        );

        return;

      }

      const formData =
        new FormData();

      formData.append(
        "prescription",
        files[appointmentId]
      );

      formData.append(
        "notes",
        notes[appointmentId] || ""
      );

      formData.append(
        "appointmentId",
        appointmentId
      );

      const { data } =
        await axios.post(

          backendUrl +
          "/api/doctor/upload-prescription",

          formData,

          {
            headers: {
              dtoken: dToken
            }
          }

        );

      if (data.success) {

        toast.success(
          data.message
        );

        getAppointments();

      } else {

        toast.error(
          data.message
        );

      }

    } catch (error) {

      console.log(error);

      toast.error(
        error.message
      );

    }

  };

  useEffect(() => {

    if (dToken) {

      getAppointments();

    }

  }, [dToken]);

  return (

    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Doctor Appointments
      </h1>

      <div className="space-y-6">

        {

          appointments?.map(
            (item) => (

              <div

                key={item._id}

                className="
                bg-white
                rounded-xl
                shadow
                p-5
                border
                "

              >

                <div className="space-y-2">

                  <p>
                    <span className="font-semibold">
                      Patient:
                    </span>{" "}
                    {item.userData?.name}
                  </p>

                  <p>
                    <span className="font-semibold">
                      Date:
                    </span>{" "}
                    {item.slotDate}
                  </p>

                  <p>
                    <span className="font-semibold">
                      Time:
                    </span>{" "}
                    {item.slotTime}
                  </p>

                  <p>

                    <span className="font-semibold">
                      Status:
                    </span>{" "}

                    {

                      item.cancelled

                        ?

                        <span className="text-red-500">
                          Cancelled
                        </span>

                        :

                        item.isCompleted

                          ?

                          <span className="text-green-600">
                            Completed
                          </span>

                          :

                          <span className="text-yellow-600">
                            Pending
                          </span>

                    }

                  </p>

                </div>

                {

                  !item.isCompleted &&
                  !item.cancelled && (

                    <button

                      onClick={() =>
                        completeAppointment(
                          item._id
                        )
                      }

                      className="
                      bg-green-600
                      text-white
                      px-4
                      py-2
                      rounded
                      mt-4
                      "

                    >

                      Complete Appointment

                    </button>

                  )

                }

                <div className="mt-5">

                  <h3 className="font-semibold mb-2">
                    Upload Prescription
                  </h3>

                  <input

                    type="file"

                    onChange={(e) =>

                      setFiles({

                        ...files,

                        [item._id]:
                        e.target.files[0]

                      })

                    }

                    className="mb-3"

                  />

                  <textarea

                    placeholder="Prescription Notes"

                    value={
                      notes[item._id] || ""
                    }

                    onChange={(e) =>

                      setNotes({

                        ...notes,

                        [item._id]:
                        e.target.value

                      })

                    }

                    className="
                    w-full
                    border
                    rounded
                    p-2
                    mb-3
                    "

                  />

                  <button

                    onClick={() =>
                      uploadPrescription(
                        item._id
                      )
                    }

                    className="
                    bg-blue-600
                    text-white
                    px-4
                    py-2
                    rounded
                    "

                  >

                    Upload Prescription

                  </button>

                </div>

              </div>

            )

          )

        }

      </div>

    </div>

  );

};

export default DoctorAppointments;