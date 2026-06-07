import React, { useEffect, useContext } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorsList = () => {
  const {
    doctors,
    aToken,
    getAllDoctors,
    changeAvailability
  } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
       getAllDoctors();
    }
  }, [aToken]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        Doctors List
      </h2>

      {doctors.length > 0 ? (
        <div>
          {doctors.map((doctor) => (
            <div
              key={doctor._id}
              className="border p-4 rounded-lg shadow mb-3"
            >
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-20 h-20 rounded-full"
              />

              <p><strong>Name:</strong> {doctor.name}</p>
              <p><strong>Email:</strong> {doctor.email}</p>
              <p><strong>Speciality:</strong> {doctor.speciality}</p>
              <p><strong>Experience:</strong> {doctor.experience}</p>
              <p><strong>Fees:</strong> ₹{doctor.fees}</p>

              <label>
                <input
                  type="checkbox"
                  checked={doctor.available}
                  onChange={() =>
                    changeAvailability(doctor._id)
                  }
                />
                Available
              </label>
            </div>
          ))}
        </div>
      ) : (
        <p>No doctors found</p>
      )}
    </div>
  );
};

export default DoctorsList;