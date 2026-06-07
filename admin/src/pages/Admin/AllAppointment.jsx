import React, {
  useContext,
  useEffect,
  useState
} from "react";

import { AdminContext } from "../../context/AdminContext";

const AllAppointment = () => {

  const {
    appointments = [],
    getAllAppointments
  } = useContext(AdminContext);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 5;

  useEffect(() => {

    getAllAppointments();

  }, []);

  // Search Filter
  const filteredAppointments = appointments.filter((item) =>

    item.userData?.name
      ?.toLowerCase()
      .includes(search.toLowerCase())

    ||

    item.docData?.name
      ?.toLowerCase()
      .includes(search.toLowerCase())

  );

  // Pagination
  const lastIndex =
    currentPage * recordsPerPage;

  const firstIndex =
    lastIndex - recordsPerPage;

  const currentAppointments =
    filteredAppointments.slice(
      firstIndex,
      lastIndex
    );

  const totalPages =
    Math.ceil(
      filteredAppointments.length /
      recordsPerPage
    );

  return (

    <div className="bg-white rounded-2xl shadow-md p-6">

      {/* Header */}

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">

        <h2 className="text-2xl font-bold text-gray-800">
          All Appointments
        </h2>

        <input
          type="text"
          placeholder="Search Patient / Doctor"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-72 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

      </div>

      {/* Empty State */}

      {filteredAppointments.length === 0 ? (

        <div className="text-center py-10 text-gray-500">
          No Appointments Found
        </div>

      ) : (

        <>
          {/* Table */}

          <div className="overflow-x-auto">

            <table className="w-full border-collapse">

              <thead>

                <tr className="bg-blue-600 text-white">

                  <th className="p-3 text-left">
                    Patient
                  </th>

                  <th className="p-3 text-left">
                    Doctor
                  </th>

                  <th className="p-3 text-left">
                    Date
                  </th>

                  <th className="p-3 text-left">
                    Time
                  </th>

                  <th className="p-3 text-left">
                    Payment
                  </th>

                  <th className="p-3 text-left">
                    Status
                  </th>

                </tr>

              </thead>

              <tbody>

                {currentAppointments.map(
                  (item, index) => (

                    <tr
                      key={index}
                      className="border-b hover:bg-gray-50 transition"
                    >

                      <td className="p-3">
                        {item.userData?.name}
                      </td>

                      <td className="p-3">
                        {item.docData?.name}
                      </td>

                      <td className="p-3">
                        {item.slotDate}
                      </td>

                      <td className="p-3">
                        {item.slotTime}
                      </td>

                      <td className="p-3">

                        {item.payment ? (

                          <span className="text-green-600 font-medium">
                            Paid
                          </span>

                        ) : (

                          <span className="text-red-500 font-medium">
                            Pending
                          </span>

                        )}

                      </td>

                      <td className="p-3">

                        {item.cancelled ? (

                          <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">
                            Cancelled
                          </span>

                        ) : item.isCompleted ? (

                          <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                            Completed
                          </span>

                        ) : (

                          <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                            Pending
                          </span>

                        )}

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

          {/* Pagination */}

          <div className="flex justify-center gap-2 mt-6">

            {[...Array(totalPages)].map(
              (_, index) => (

                <button
                  key={index}
                  onClick={() =>
                    setCurrentPage(index + 1)
                  }
                  className={`px-4 py-2 rounded-lg transition ${
                    currentPage === index + 1
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >

                  {index + 1}

                </button>

              )
            )}

          </div>

        </>

      )}

    </div>

  );

};

export default AllAppointment;