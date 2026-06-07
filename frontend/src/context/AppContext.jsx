import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppcontextProvider = (props) => {

  const backendUrl = "http://localhost:4000";
  const currencySymbol = "₹";

  const [doctors, setDoctors] = useState([]);

  const [token, setToken] = useState(
    localStorage.getItem("token") || ""
  );

  const [userData, setUserData] = useState(false);
  const [appointments,setAppointments] = useState([])
const [dashData,setDashData] = useState(false)

  // Get Doctors
  const getDoctorsData = async () => {
    try {

      const { data } = await axios.get(
        backendUrl + "/api/doctor/list"
      );

      if (data.success) {

        setDoctors(data.doctors);

      } else {

        toast.error(data.message);

      }

    } catch (error) {

      console.log(error);

      toast.error(error.message);

    }
  };

  // Load User Profile
  const loadUserProfileData = async () => {
    try {

      const { data } = await axios.get(
        backendUrl + "/api/user/get-profile",
        {
          headers: { token }
        }
      );

      if (data.success) {

        setUserData(data.userData);

      } else {

        toast.error(data.message);

      }

    } catch (error) {

      console.log(error);

      toast.error(error.message);

    }
  };

  useEffect(() => {
    getDoctorsData();
  }, []);

  useEffect(() => {

    if (token) {
      loadUserProfileData();
    }

  }, [token]);

  useEffect(() => {

    localStorage.setItem("token", token);

  }, [token]);

  

  const value = {
    doctors,
    setDoctors,

    currencySymbol,

    backendUrl,

    token,
    setToken,

    userData,
    setUserData,

    getDoctorsData,
    loadUserProfileData
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );

};


export default AppcontextProvider;