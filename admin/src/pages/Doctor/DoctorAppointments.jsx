import React,
{
 useContext,
 useEffect
}
from 'react'

import axios from 'axios'

import {
 DoctorContext
}
from '../../context/DoctorContext'

const DoctorAppointments = () => {

 const {

  backendUrl,
  dToken,

  appointments,
  setAppointments

 } = useContext(
  DoctorContext
 )

 const getAppointments =
 async ()=>{

  const {data}
   = await axios.get(

    backendUrl+
    "/api/doctor/appointments",

    {
      headers:{
       dtoken:dToken
      }
    }

   )

  if(data.success){

   setAppointments(
    data.appointments
   )

  }

 }

 const completeAppointment =
 async (
  appointmentId
 )=>{

  await axios.post(

   backendUrl+
   "/api/doctor/complete-appointment",

   {
    appointmentId
   },

   {
    headers:{
      dtoken:dToken
    }
   }

  )

  getAppointments()

 }

 useEffect(()=>{

  if(dToken){

   getAppointments()

  }

 },[dToken])

 return (

  <div className="p-6">

   <h1 className="text-2xl font-bold mb-5">
    Doctor Appointments
   </h1>

   <table className="w-full bg-white">

    <thead>

     <tr>

      <th>Patient</th>
      <th>Date</th>
      <th>Time</th>
      <th>Status</th>
      <th>Action</th>

     </tr>

    </thead>

    <tbody>

     {

      appointments?.map(

       item=>(

        <tr key={item._id}>

         <td>
          {item.userData?.name}
         </td>

         <td>
          {item.slotDate}
         </td>

         <td>
          {item.slotTime}
         </td>

         <td>

          {
           item.isCompleted
           ? "Completed"
           : "Pending"
          }

         </td>

         <td>

          {

           !item.isCompleted &&

           <button

            onClick={()=>

             completeAppointment(
              item._id
             )

            }

           >

            Complete

           </button>

          }

         </td>

        </tr>

       )

      )

     }

    </tbody>

   </table>

  </div>

 )

}

export default DoctorAppointments