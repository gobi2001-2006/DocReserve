import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {

  const {
    userData,
    backendUrl,
    token,
    loadUserProfileData
  } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [tempData, setTempData] = useState(null);
  const [imageFile, setImageFile] = useState(false);

  useEffect(() => {

    if (userData) {

      setTempData(userData);

    }

  }, [userData]);

  if (!userData || !tempData) {

    return (
      <div className="text-center mt-20 text-lg">
        Loading Profile...
      </div>
    );

  }

  const handleImageChange = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setImageFile(file);

    setTempData((prev) => ({
      ...prev,
      image: URL.createObjectURL(file)
    }));

  };

  const handleSave = async () => {

    try {

      const formData = new FormData();

      formData.append("name", tempData.name);
      formData.append("phone", tempData.phone);
      formData.append("gender", tempData.gender);
      formData.append("dob", tempData.dob);

      formData.append(
        "address",
        JSON.stringify(tempData.address)
      );

      if (imageFile) {

        formData.append("image", imageFile);

      }

      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        {
          headers: {
            token
          }
        }
      );

      if (data.success) {

        toast.success(data.message);

        await loadUserProfileData();

        setIsEdit(false);

      } else {

        toast.error(data.message);

      }

    } catch (error) {

      console.log(error);

      toast.error(error.message);

    }

  };

  return (

    <div className="max-w-3xl mx-auto p-6">

      <div className="bg-white rounded-xl shadow-lg p-8">

        {/* Profile Image */}

        <div className="flex flex-col items-center">

          <img
            src={tempData.image}
            alt="Profile"
            className="w-36 h-36 rounded-full object-cover border"
          />

          {
            isEdit && (
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-4"
              />
            )
          }

        </div>

        {/* Name */}

        <div className="mt-6">

          <label className="font-semibold">
            Full Name
          </label>

          {
            isEdit ? (

              <input
                type="text"
                value={tempData.name}
                onChange={(e) =>
                  setTempData({
                    ...tempData,
                    name: e.target.value
                  })
                }
                className="w-full border p-2 rounded mt-1"
              />

            ) : (

              <p className="text-lg mt-1">
                {userData.name}
              </p>

            )
          }

        </div>

        {/* Email */}

        <div className="mt-4">

          <label className="font-semibold">
            Email
          </label>

          <p className="mt-1">
            {userData.email}
          </p>

        </div>

        {/* Phone */}

        <div className="mt-4">

          <label className="font-semibold">
            Phone
          </label>

          {
            isEdit ? (

              <input
                type="text"
                value={tempData.phone}
                onChange={(e) =>
                  setTempData({
                    ...tempData,
                    phone: e.target.value
                  })
                }
                className="w-full border p-2 rounded mt-1"
              />

            ) : (

              <p className="mt-1">
                {userData.phone}
              </p>

            )
          }

        </div>

        {/* Gender */}

        <div className="mt-4">

          <label className="font-semibold">
            Gender
          </label>

          {
            isEdit ? (

              <select
                value={tempData.gender}
                onChange={(e) =>
                  setTempData({
                    ...tempData,
                    gender: e.target.value
                  })
                }
                className="w-full border p-2 rounded mt-1"
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>

            ) : (

              <p className="mt-1">
                {userData.gender}
              </p>

            )
          }

        </div>

        {/* DOB */}

        <div className="mt-4">

          <label className="font-semibold">
            Date of Birth
          </label>

          {
            isEdit ? (

              <input
                type="date"
                value={tempData.dob}
                onChange={(e) =>
                  setTempData({
                    ...tempData,
                    dob: e.target.value
                  })
                }
                className="w-full border p-2 rounded mt-1"
              />

            ) : (

              <p className="mt-1">
                {userData.dob}
              </p>

            )
          }

        </div>

        {/* Address */}

        <div className="mt-4">

          <label className="font-semibold">
            Address Line 1
          </label>

          {
            isEdit ? (

              <input
                type="text"
                value={tempData.address.line1}
                onChange={(e) =>
                  setTempData({
                    ...tempData,
                    address: {
                      ...tempData.address,
                      line1: e.target.value
                    }
                  })
                }
                className="w-full border p-2 rounded mt-1"
              />

            ) : (

              <p className="mt-1">
                {userData.address?.line1}
              </p>

            )
          }

        </div>

        <div className="mt-4">

          <label className="font-semibold">
            Address Line 2
          </label>

          {
            isEdit ? (

              <input
                type="text"
                value={tempData.address.line2}
                onChange={(e) =>
                  setTempData({
                    ...tempData,
                    address: {
                      ...tempData.address,
                      line2: e.target.value
                    }
                  })
                }
                className="w-full border p-2 rounded mt-1"
              />

            ) : (

              <p className="mt-1">
                {userData.address?.line2}
              </p>

            )
          }

        </div>

        {/* Buttons */}

        <div className="mt-8 flex gap-4">

          {
            !isEdit ? (

              <button
                onClick={() => setIsEdit(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded"
              >
                Edit Profile
              </button>

            ) : (

              <>
                <button
                  onClick={handleSave}
                  className="bg-green-600 text-white px-6 py-2 rounded"
                >
                  Save Changes
                </button>

                <button
                  onClick={() => {
                    setTempData(userData);
                    setIsEdit(false);
                  }}
                  className="bg-red-500 text-white px-6 py-2 rounded"
                >
                  Cancel
                </button>
              </>
            )
          }

        </div>

      </div>

    </div>

  );

};

export default Profile;