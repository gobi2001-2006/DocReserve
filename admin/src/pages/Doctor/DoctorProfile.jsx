import React,
{
 useContext,
 useEffect,
 useState
}
from 'react'

import axios from 'axios'

import {
 DoctorContext
}
from '../../context/DoctorContext'

const DoctorProfile = () => {

 const {

  backendUrl,
  dToken,

  profileData,
  setProfileData

 } = useContext(
  DoctorContext
 )

 const [edit,
  setEdit]
  = useState(false)

 const getProfile =
 async ()=>{

  const {data}
   = await axios.get(

    backendUrl+
    "/api/doctor/profile",

    {
      headers:{
        dtoken:dToken
      }
    }

   )

  if(data.success){

   setProfileData(
    data.profileData
   )

  }

 }

 const updateProfile =
 async ()=>{

  await axios.post(

   backendUrl+
   "/api/doctor/update-profile",

   profileData,

   {
    headers:{
      dtoken:dToken
    }
   }

  )

  setEdit(false)

 }

 useEffect(()=>{

  if(dToken){

   getProfile()

  }

 },[dToken])

 return profileData && (

  <div className="p-6">

   <img
    src={profileData.image}
    className="w-40"
   />

   <h2 className="text-3xl font-bold">
    {profileData.name}
   </h2>

   <p>
    {profileData.speciality}
   </p>

   <div className="mt-5">

    <p>
      Fees
    </p>

    <input

     disabled={!edit}

     value={
      profileData.fees
     }

     onChange={(e)=>

      setProfileData(
       prev=>({

        ...prev,

        fees:
        e.target.value

       })
      )

     }

    />

   </div>

   {

    edit

    ?

    <button
      onClick={
       updateProfile
      }
    >
      Save
    </button>

    :

    <button
      onClick={()=>
       setEdit(true)
      }
    >
      Edit
    </button>

   }

  </div>

 )

}

export default DoctorProfile