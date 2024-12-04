import React, { useState } from "react";

const ProfileInfo = ({ userProfile, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableProfile, setEditableProfile] = useState(userProfile);
  const [profilePicturePreview, setProfilePicturePreview] = useState(
    userProfile.profilePicture || "https://via.placeholder.com/150"
  );

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableProfile({ ...editableProfile, [name]: value });
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePicturePreview(reader.result);
        setEditableProfile({ ...editableProfile, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    onEdit(editableProfile); // Save changes
  };

  return (
    <div className="card mx-auto shadow" style={{ maxWidth: "500px" }}>
      <div className="card-body text-center">
        {/* Profile Picture */}
        <div className="mb-3">
          <img
            src={profilePicturePreview}
            alt="Profile"
            className="rounded-circle"
            style={{ width: "120px", height: "120px", objectFit: "cover" }}
          />
        </div>

        {isEditing && (
          <div className="mb-3">
            <label className="form-label">Change Profile Picture:</label>
            <input
              type="file"
              accept="image/*"
              className="form-control"
              onChange={handlePictureChange}
            />
          </div>
        )}

        <h1 className="card-title text-primary mb-4">Profile</h1>

        {/* Editable Fields */}
        {isEditing ? (
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
              <label className="form-label">Email:</label>
              <input
                type="email"
                name="email"
                value={editableProfile.email}
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
            {editableProfile.otherDetails && (
              <>
                <div className="mb-3">
                  <label className="form-label">Phone:</label>
                  <input
                    type="text"
                    name="phone"
                    value={editableProfile.otherDetails.phone}
                    onChange={(e) =>
                      setEditableProfile({
                        ...editableProfile,
                        otherDetails: {
                          ...editableProfile.otherDetails,
                          phone: e.target.value,
                        },
                      })
                    }
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Address:</label>
                  <input
                    type="text"
                    name="address"
                    value={editableProfile.otherDetails.address}
                    onChange={(e) =>
                      setEditableProfile({
                        ...editableProfile,
                        otherDetails: {
                          ...editableProfile.otherDetails,
                          address: e.target.value,
                        },
                      })
                    }
                    className="form-control"
                  />
                </div>
              </>
            )}
          </div>
        ) : (
          <div>
            <p className="card-text">
              <strong>User ID:</strong> {editableProfile.user_id}
            </p>
            <p className="card-text">
              <strong>Name:</strong> {editableProfile.name}
            </p>
            <p className="card-text">
              <strong>Email:</strong> {editableProfile.email}
            </p>
            <p className="card-text">
              <strong>Contact Number:</strong> {editableProfile.contact_number}
            </p>
            {editableProfile.otherDetails && (
              <div className="mt-3">
                <h5 className="text-secondary">Other Details</h5>
                <p className="card-text">
                  <strong>Phone:</strong> {editableProfile.otherDetails.phone}
                </p>
                <p className="card-text">
                  <strong>Address:</strong> {editableProfile.otherDetails.address}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-4">
          {isEditing ? (
            <>
              <button className="btn btn-primary me-2" onClick={handleSave}>
                Save
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </>
          ) : (
            <button className="btn btn-primary" onClick={handleEditToggle}>
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
