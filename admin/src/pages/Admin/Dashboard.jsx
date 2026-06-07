import React, { useContext, useEffect } from "react";
import {
  FaUserMd,
  FaUsers,
  FaCalendarCheck
} from "react-icons/fa";

import { AdminContext } from "../../context/AdminContext";

const Dashboard = () => {

  const {
    dashData,
    getDashData
  } = useContext(AdminContext);

  useEffect(() => {

    getDashData();

  }, []);

  if (!dashData) return null;

  return (

    <div className="p-6">

      {/* Header */}

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-slate-800">
          Welcome Back, Admin 👋
        </h1>

        <p className="text-gray-500 mt-2">
          Here's what's happening today.
        </p>

      </div>

      {/* Cards */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white rounded-2xl shadow-sm p-6 flex items-center gap-5">

          <div className="bg-blue-100 p-4 rounded-xl">

            <FaUserMd
              className="text-blue-600"
              size={35}
            />

          </div>

          <div>

            <p className="text-gray-500">
              Doctors
            </p>

            <h2 className="text-4xl font-bold text-blue-600">
              {dashData.doctors}
            </h2>

          </div>

        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 flex items-center gap-5">

          <div className="bg-green-100 p-4 rounded-xl">

            <FaUsers
              className="text-green-600"
              size={35}
            />

          </div>

          <div>

            <p className="text-gray-500">
              Patients
            </p>

            <h2 className="text-4xl font-bold text-green-600">
              {dashData.patients}
            </h2>

          </div>

        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 flex items-center gap-5">

          <div className="bg-purple-100 p-4 rounded-xl">

            <FaCalendarCheck
              className="text-purple-600"
              size={35}
            />

          </div>

          <div>

            <p className="text-gray-500">
              Appointments
            </p>

            <h2 className="text-4xl font-bold text-purple-600">
              {dashData.appointments}
            </h2>

          </div>

        </div>

      </div>

      {/* Recent Appointments */}

      <div className="bg-white rounded-2xl shadow-sm mt-8 p-6">

        <h2 className="text-2xl font-semibold mb-6">
          Recent Appointments
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="text-left py-4">
                  Patient
                </th>

                <th className="text-left py-4">
                  Doctor
                </th>

                <th className="text-left py-4">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {dashData.latestAppointments?.map(
                (item, index) => (

                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="py-4">
                      {item.userData?.name}
                    </td>

                    <td className="py-4">
                      {item.docData?.name}
                    </td>

                    <td className="py-4">

                      {

                        item.cancelled ?

                          <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">

                            Cancelled

                          </span>

                          :

                          item.payment ?

                            <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">

                              Paid

                            </span>

                            :

                            <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-sm">

                              Pending

                            </span>

                      }

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

};

export default Dashboard;