import React, { useState } from "react";
import { assets } from "../assets/assets";

const Profile = () => {

  const [isEdit, setIsEdit] = useState(false);

  const [userData, setUserData] = useState({
    name: "Gobika",
    image: assets.profile_pic,
    email: "gobika495@gmail.com",
    phone: "",
    address: {
      line1: "",
      line2: "",
    },
    gender: "",
    dob: "",
  });

  // Temporary state for editing (so cancel won't affect original data)
  const [tempData, setTempData] = useState(userData);

  // When Edit clicked
  const handleEditClick = () => {
    setTempData(userData);
    setIsEdit(true);
  };

  // When Save clicked
  const handleSave = () => {
    setUserData(tempData);
    setIsEdit(false);
  };

  // When Cancel clicked
  const handleCancel = () => {
    setIsEdit(false);
  };

  // Image Upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setTempData((prev) => ({
        ...prev,
        image: imageURL,
      }));
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "20px",
        background: "#f5f5f5",
        borderRadius: "10px",
      }}
    >
      {/* Profile Image */}
      <img
        src={isEdit ? tempData.image : userData.image}
        alt="Profile"
        width="120"
        style={{
          borderRadius: "50%",
          display: "block",
          marginBottom: "15px",
        }}
      />

      {isEdit && (
        <input type="file" accept="image/*" onChange={handleImageChange} />
      )}

      {/* Name */}
      {isEdit ? (
        <input
          type="text"
          value={tempData.name}
          onChange={(e) =>
            setTempData((prev) => ({ ...prev, name: e.target.value }))
          }
          style={{ fontSize: "22px", padding: "5px" }}
        />
      ) : (
        <h2 style={{ textTransform: "capitalize" }}>
          {userData.name}
        </h2>
      )}

      <hr />

      <h3>CONTACT INFORMATION</h3>

      <p><strong>Email:</strong> {userData.email}</p>

      <p><strong>Phone:</strong></p>
      {isEdit ? (
        <input
          type="text"
          maxLength="10"
          value={tempData.phone}
          onChange={(e) =>
            setTempData((prev) => ({
              ...prev,
              phone: e.target.value.replace(/\D/g, ""),
            }))
          }
        />
      ) : (
        <p>{userData.phone || "Not Provided"}</p>
      )}

      <p><strong>Address:</strong></p>

      {isEdit ? (
        <div>
          <input
            type="text"
            placeholder="Address line 1"
            value={tempData.address.line1}
            onChange={(e) =>
              setTempData((prev) => ({
                ...prev,
                address: {
                  ...prev.address,
                  line1: e.target.value,
                },
              }))
            }
          />
          <br /><br />
          <input
            type="text"
            placeholder="Address line 2"
            value={tempData.address.line2}
            onChange={(e) =>
              setTempData((prev) => ({
                ...prev,
                address: {
                  ...prev.address,
                  line2: e.target.value,
                },
              }))
            }
          />
        </div>
      ) : (
        <p>
          {userData.address.line1 || "Not Provided"}
          <br />
          {userData.address.line2}
        </p>
      )}

      <hr />

      <h3>BASIC INFORMATION</h3>

      <p><strong>Gender:</strong></p>
      {isEdit ? (
        <select
          value={tempData.gender}
          onChange={(e) =>
            setTempData((prev) => ({ ...prev, gender: e.target.value }))
          }
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      ) : (
        <p>{userData.gender || "Not Selected"}</p>
      )}

      <p><strong>Birthday:</strong></p>
      {isEdit ? (
        <input
          type="date"
          value={tempData.dob}
          onChange={(e) =>
            setTempData((prev) => ({ ...prev, dob: e.target.value }))
          }
        />
      ) : (
        <p>{userData.dob || "Not Selected"}</p>
      )}

      <br /><br />

      {/* Buttons */}
      {!isEdit ? (
        <button
          onClick={handleEditClick}
          style={buttonStyle}
        >
          Edit
        </button>
      ) : (
        <>
          <button onClick={handleSave} style={buttonStyle}>
            Save
          </button>
          <button
            onClick={handleCancel}
            style={{ ...buttonStyle, marginLeft: "10px", borderColor: "red" }}
          >
            Cancel
          </button>
        </>
      )}
    </div>
  );
};

const buttonStyle = {
  padding: "8px 20px",
  borderRadius: "20px",
  border: "1px solid blue",
  background: "white",
  cursor: "pointer",
};

export default Profile;