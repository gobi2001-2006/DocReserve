import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div className="px-4 md:px-10">

      {/* Heading */}
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          CONTACT <span className="text-gray-700 font-medium">US</span>
        </p>
      </div>

      {/* Content */}
      <div className="my-12 flex flex-col md:flex-row gap-12 items-center">

        {/* Image */}
        <img
          src={assets.contact_image}
          alt="Contact DocReserve"
          className="w-full md:max-w-[420px] rounded-lg"
        />

        {/* Right Content */}
        <div className="flex flex-col gap-6 text-gray-600 md:w-1/2">

          <div>
            <p className="text-lg font-semibold text-gray-700 mb-2">
              OUR OFFICE
            </p>
            <p className="text-sm leading-6">
              No. 12, Anna Nagar <br />
              Chennai, Tamil Nadu, India
            </p>
          </div>

          <div>
            <p className="text-sm leading-6">
              📞 123456789 <br />
              ✉️ abc@gmail.com
            </p>
          </div>

          <div>
            <p className="text-lg font-semibold text-gray-700 mb-2">
              CAREERS AT DOCRESERVE
            </p>
            <p className="text-sm leading-6 mb-4">
              Learn more about our teams and job openings.
            </p>

            <button className="border border-gray-700 px-6 py-3 text-sm hover:bg-gray-700 hover:text-white transition">
              Explore Jobs
            </button>
          </div>

        </div>
      </div>

    </div>
  )
}

export default Contact