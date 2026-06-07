import React, { createContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const [aToken, setAToken] = useState(
    localStorage.getItem("aToken") || ""
  );

  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([])
const [dashData, setDashData] = useState(false)

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Get all doctors
  const getAllDoctors = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/all-doctors",
        {},
        {
          headers: { atoken: aToken }
        }
      );

      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message);
    }
  };

  // Change availability
  const changeAvailability = async (docId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/change-availability",
        { docId },
        {
          headers: { atoken: aToken }
        }
      );

      if (data.success) {
        toast.success(data.message);

        // refresh doctors list
        await getAllDoctors();

      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message);
    }
  };
  const getDashData = async () => {

  try {

    const { data } = await axios.get(

      backendUrl + "/api/admin/dashboard",

      {
        headers: {
          atoken: aToken
        }
      }

    )

    if (data.success) {

      setDashData(data.dashData)

    }

  } catch (error) {

    toast.error(error.message)

  }

}

const getAllAppointments = async () => {

  try {

    const { data } = await axios.get(

      backendUrl + "/api/admin/appointments",

      {
        headers: {
          atoken: aToken
        }
      }

    )

    if (data.success) {

      setAppointments(data.appointments)

    }

  } catch (error) {

    toast.error(error.message)

  }

}

 const value = {

  aToken,
  setAToken,

  backendUrl,

  doctors,
  getAllDoctors,
  changeAvailability,

  appointments,
  getAllAppointments,

  dashData,
  getDashData

};

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

export { AdminContext };
export default AdminContextProvider;