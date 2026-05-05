import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Doctors = () => {

  const { speciality } = useParams()
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)

  useEffect(() => {

    if (!doctors) return

    if (speciality) {

      const filtered = doctors.filter(
        (doc) =>
          doc?.speciality?.toLowerCase() === speciality.toLowerCase()
      )

      setFilterDoc(filtered)

    } else {

      setFilterDoc(doctors)

    }

  }, [doctors, speciality])

  const specialities = [
    'General physician',
    'Gynecologist',
    'Dermatologist',
    'Pediatricians',
    'Neurologist',
    'Gastroenterologist'
  ]

  return (

    <div className="px-4 md:px-10 my-10">

      <p className="text-gray-600 mb-6">
        Browse through the doctors speciality.
      </p>

      <div className="flex flex-col sm:flex-row gap-6">
        

        <button
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden 
          ${showFilter ? 'bg-blue-600 text-white' : ''}`}
          onClick={() => setShowFilter(prev => !prev)}
        >
          Filters
        </button>


        <div
          className={`sm:w-1/4 flex flex-col gap-3 
          ${showFilter ? 'flex' : 'hidden sm:flex'}`}
        >

          {specialities.map((item) => (

            <p
              key={item}
              onClick={() => {

                if (speciality === item) {

                  navigate('/doctors')

                } else {

                  navigate(`/doctors/${item}`)

                }

              }}

              className={`cursor-pointer border rounded-lg px-4 py-2

              ${speciality === item
                  ? 'bg-blue-100 border-blue-500 text-blue-700'
                  : 'border-gray-300 hover:bg-gray-100'
                }
              `}
            >

              {item}

            </p>

          ))}

        </div>


        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

          {filterDoc.map((item) => (

            <div
              key={item._id}
              onClick={() => navigate(`/appointment/${item._id}`)}

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

                <h3 className="text-lg font-semibold">
                  {item.name}
                </h3>

                <p className="text-gray-500 text-sm">
                  {item.speciality}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  )

}

export default Doctors