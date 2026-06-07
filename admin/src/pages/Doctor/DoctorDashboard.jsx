import React,
{
 useContext,
 useEffect
}
from 'react'

import {
 DoctorContext
}
from '../../context/DoctorContext'

import axios from 'axios'

const DoctorDashboard = () => {

 const {
  backendUrl,
  dToken,
  dashData,
  setDashData
 } = useContext(
  DoctorContext
 )

 const getDashData =
 async ()=>{

  const {data}
   = await axios.get(

    backendUrl +
    "/api/doctor/dashboard",

    {
      headers:{
        dtoken:dToken
      }
    }

   )

  if(data.success){

    setDashData(
      data.dashData
    )

  }

 }

 useEffect(()=>{

  if(dToken){

   getDashData()

  }

 },[dToken])

 return dashData && (

  <div className="p-6">

   <h1 className="text-3xl font-bold mb-6">
    Doctor Dashboard
   </h1>

   <div className="grid md:grid-cols-3 gap-6">

    <div className="bg-white p-6 rounded-xl shadow">

      <p>Appointments</p>

      <h2 className="text-4xl font-bold">
       {dashData.appointments}
      </h2>

    </div>

    <div className="bg-white p-6 rounded-xl shadow">

      <p>Patients</p>

      <h2 className="text-4xl font-bold">
       {dashData.patients}
      </h2>

    </div>

    <div className="bg-white p-6 rounded-xl shadow">

      <p>Earnings</p>

      <h2 className="text-4xl font-bold">
       ₹{dashData.earnings}
      </h2>

    </div>

   </div>

  </div>

 )

}

export default DoctorDashboard