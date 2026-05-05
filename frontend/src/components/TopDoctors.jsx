import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopDoctors = () => {
  const navigate =useNavigate()
  const {doctors}=useContext(AppContext)
  return (
    <div className="my-16 px-4 md:px-10 text-gray-900">
      
      <h1 className="text-3xl font-semibold text-center">
        Top Doctors to Book
      </h1>
      <p className="text-center text-sm mt-2 mb-10 text-gray-600">
        Simply browse through our extensive list of trusted doctors.
      </p>

      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {doctors.slice(0, 8).map((item, index) => (
          <div onClick={()=>navigate(`/appointment/${item._id}`)}
            key={index}
            className="bg-blue-50 border border-blue-200 rounded-2xl overflow-hidden
                       hover:shadow-lg hover:-translate-y-2 transition-all duration-300 cursor-pointer"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-64 object-contain p-6"
            />

          
            <div className="bg-white p-4">
              <div className="flex items-center gap-2 text-green-500 text-sm mb-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>Available</span>
              </div>

              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-500 text-sm">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
       <button onClick={()=>{
           navigate(`/doctors`);scrollTo(0,0)}}className='bg-blue-600 text-white px-8 py-3 rounded-full mt-6 hover:bg-blue-700 transition cursor-pointer'>
        More
      </button>

    </div>
  )
}

export default TopDoctors