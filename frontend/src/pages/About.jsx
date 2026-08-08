import React, { useState } from 'react';
import { assets } from '../assets/assets;'

const About = () => {

  const [activeIndex, setActiveIndex] = useState(0)

  const whyChooseUs = [
    {
      title: 'EFFICIENCY',
      desc: 'Streamlined appointment scheduling that fits into your busy lifestyle.',
    },
    {
      title: 'CONVENIENCE',
      desc: 'Access to a network of trusted healthcare professionals in your area.',
    },
    {
      title: 'PERSONALIZATION',
      desc: 'Tailored recommendations and reminders to help you stay on top of your health.',
    },
  ]

  return (
    <div className="px-4 md:px-10">

      {/* ABOUT US Heading */}
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          ABOUT <span className="text-gray-700 font-medium">US</span>
        </p>
      </div>

      {/* About Content */}
      <div className="my-12 flex flex-col md:flex-row gap-12 items-center">
        <img
          className="w-full md:max-w-[360px]"
          src={assets.about_image}
          alt="About DocReserve"
        />

        <div className="flex flex-col gap-6 md:w-2/4 text-sm text-gray-600 leading-6">
          <p>
            Welcome to <span className="font-medium text-gray-700">DocReserve</span>,
            your reliable partner in simplifying healthcare access with ease and efficiency.
            At DocReserve, we understand the challenges individuals face when it comes to
            finding the right doctors, checking availability, and booking appointments
            without unnecessary delays.
          </p>

          <p>
            DocReserve is dedicated to delivering excellence in healthcare technology.
            We continuously enhance our platform by adopting modern tools and innovations
            to improve user experience and service quality. Whether you are scheduling
            your first consultation or managing ongoing medical appointments, DocReserve
            is here to support you every step of the way.
          </p>
        </div>
      </div>

      {/* WHY CHOOSE US Heading */}
      <div className="text-xl my-8">
        <p>
          WHY <span className="text-gray-700 font-semibold">CHOOSE US</span>
        </p>
      </div>

      {/* WHY CHOOSE US Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 border rounded-lg overflow-hidden mb-16">
        {whyChooseUs.map((item, index) => (
          <div
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`p-8 cursor-pointer transition-all duration-300 border-l-4
              ${activeIndex === index
                ? 'border-blue-600 bg-blue-50 text-gray-800'
                : 'border-transparent bg-white text-gray-700 hover:bg-gray-100'}
            `}
          >
            <h3 className="font-semibold mb-4">
              {item.title}:
            </h3>
            <p className="text-sm leading-6">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

    </div>
  )
}

export default About;