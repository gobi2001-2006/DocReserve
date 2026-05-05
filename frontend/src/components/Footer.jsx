import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-50 mt-20 px-6 md:px-10 pt-12">
      
      {/* Top Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 text-gray-700">
        
        {/* Logo + Description */}
        <div>
          <img src="/logo1.svg" alt="DocReserve Logo" className="w-40 mb-4" />
          <p className="text-sm leading-6">
            DocReserve is a smart doctor appointment booking platform that helps users
            easily find doctors by speciality, check availability, and reserve appointments
            through a simple and user-friendly interface.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <p className="font-semibold mb-4">COMPANY</p>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-blue-600 cursor-pointer">Home</li>
            <li className="hover:text-blue-600 cursor-pointer">About Us</li>
            <li className="hover:text-blue-600 cursor-pointer">Contact</li>
            <li className="hover:text-blue-600 cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <p className="font-semibold mb-4">GET IN TOUCH</p>
          <ul className="space-y-2 text-sm">
            <li>📞 123456789</li>
            <li>✉️ abc@gmail.com</li>
          </ul>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="mt-10 border-t pt-4 text-center text-sm text-gray-500">
        © 2024 DocReserve. All Rights Reserved.
      </div>

    </footer>
  )
}

export default Footer