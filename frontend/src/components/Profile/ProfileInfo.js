import React, { useState } from "react";
import axios from "axios";

const ProfileInfo = ({ userProfile }) => {
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [isEditingPicture, setIsEditingPicture] = useState(false);
  const [editableProfile, setEditableProfile] = useState(userProfile);
  const [profilePicturePreview, setProfilePicturePreview] = useState(
    userProfile.profile_picture
      ? `http://localhost:5000/${userProfile.profile_picture}`
      : "https://via.placeholder.com/150"
  );
  const [profilePictureFile, setProfilePictureFile] = useState(null);

  const handleEditInfoToggle = () => {
    setIsEditingInfo(!isEditingInfo);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableProfile({ ...editableProfile, [name]: value });
  };

  const handleSaveProfile = async () => {
    try {
      const { name, email, contact_number } = editableProfile;
      const payload = { name, email, contact_number };

      const response = await axios.put(
        `http://localhost:5000/auth/profile/update/${userProfile.user_id}`,
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        setIsEditingInfo(false);
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating your profile.");
    }
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePicturePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setProfilePictureFile(file);
    }
  };

  const handleSaveProfilePicture = async () => {
    if (!profilePictureFile) {
      alert("No profile picture selected.");
      return;
    }
  
    // Validate file size and type if necessary
    const maxFileSizeMB = 10;
    if (profilePictureFile.size > maxFileSizeMB * 1024 * 1024) {
      alert(`File size exceeds ${maxFileSizeMB} MB.`);
      return;
    }
  
    const formData = new FormData();
    formData.append("profile_picture", profilePictureFile);
  
    try {
      const response = await axios.put(
        `http://localhost:5000/auth/profile/picture/update/${userProfile.user_id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
  
      if (response.status === 200) {
        alert("Profile picture updated successfully!");
        setProfilePicturePreview(response.data.filePath); // Update preview with server response
        setIsEditingPicture(false);
      } else {
        alert("Failed to update profile picture.");
      }
    } catch (error) {
      console.error("Error updating profile picture:", error);
      alert("An error occurred while updating your profile picture.");
    }
  };
  

  return (
    <div className="card mx-auto shadow " style={{ maxWidth: "500px" }}>
      <div className="card-body text-center mt-4">
        <div className="mb-3">
          <img
            src={profilePicturePreview}
            alt="Profile"
            className="rounded-circle"
            style={{ width: "120px", height: "120px", objectFit: "cover" }}
          />
        </div>

        {isEditingPicture && (
          <div className="mb-3">
            <label className="form-label">Select a new profile picture:</label>
            <input
              type="file"
              accept="image/*"
              className="form-control"
              onChange={handlePictureChange}
            />
            <button
              className="btn btn-primary mt-2"
              onClick={handleSaveProfilePicture}
            >
              Save Picture
            </button>
            <button
              className="btn btn-secondary mt-2 ms-2"
              onClick={() => setIsEditingPicture(false)}
            >
              Cancel
            </button>
          </div>
        )}

        <h1 className="card-title  mb-4" style={{ color: "#ff7e5f" }}>
          {editableProfile.name}
        </h1>

        {!isEditingInfo ? (
          <div>
            {/* <p className="card-text">
              <strong>Name:</strong> {editableProfile.name}
            </p> */}
            <p className="card-text">
              <strong>Email:</strong> {editableProfile.email}
            </p>
            <p className="card-text">
              <strong>Contact Number:</strong> {editableProfile.contact_number}
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-3">
              <label className="form-label">Name:</label>
              <input
                type="text"
                name="name"
                value={editableProfile.name}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Contact Number:</label>
              <input
                type="text"
                name="contact_number"
                value={editableProfile.contact_number}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>
        )}

        <div className="mt-4">
          {!isEditingPicture && (
            <button
              className="btn btn-outline-primary me-2"
              onClick={() => setIsEditingPicture(true)}
            >
              Change Profile Picture
            </button>
          )}
          {!isEditingInfo ? (
            <button
              className="btn"
              style={{ background: "#ff7e5f", color: "white" }}
              onClick={handleEditInfoToggle}
            >
              Edit Profile Information
            </button>
          ) : (
            <>
              <button
                className="btn btn-primary me-2"
                onClick={handleSaveProfile}
              >
                Save
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setIsEditingInfo(false)}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
