import React from "react";

const ProfileInfo = ({ userProfile }) => (
  <div className="card mx-auto shadow" style={{ maxWidth: "500px" }}>
    <div className="card-body">
      <h1 className="card-title text-center text-primary mb-4">Profile</h1>
      <p className="card-text">
        <strong>User ID:</strong> {userProfile.user_id}
      </p>
      <p className="card-text">
        <strong>Name:</strong> {userProfile.name}
      </p>
      <p className="card-text">
        <strong>Email:</strong> {userProfile.email}
      </p>
      <p className="card-text">
        <strong>Contact Number:</strong> {userProfile.contact_number}
      </p>
      {userProfile.otherDetails && (
        <div className="mt-3">
          <h5 className="text-secondary">Other Details</h5>
          <p className="card-text">
            <strong>Phone:</strong> {userProfile.otherDetails.phone}
          </p>
          <p className="card-text">
            <strong>Address:</strong> {userProfile.otherDetails.address}
          </p>
        </div>
      )}
    </div>
  </div>
);

export default ProfileInfo;
