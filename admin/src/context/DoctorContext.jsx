import {
  createContext,
  useState
} from "react";

import axios from "axios";
import { toast } from "react-toastify";

export const DoctorContext =
  createContext();

const DoctorContextProvider =
(props)=>{

  const backendUrl =
    import.meta.env.VITE_BACKEND_URL;

  const [dToken,setDToken] =
    useState(
      localStorage.getItem(
        "dToken"
      ) || ""
    );

  const [dashData,setDashData] =
    useState(false);

  const [appointments,
         setAppointments]
         = useState([]);

  const [profileData,
         setProfileData]
         = useState(false);

  const value={

    backendUrl,

    dToken,
    setDToken,

    dashData,
    setDashData,

    appointments,
    setAppointments,

    profileData,
    setProfileData

  }

  return(

    <DoctorContext.Provider
      value={value}
    >

      {props.children}

    </DoctorContext.Provider>

  )

}

export default
DoctorContextProvider;