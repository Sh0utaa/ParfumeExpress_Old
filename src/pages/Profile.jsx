import { React, useState } from 'react';
import { useAuth } from '../utils/AuthContext';
import '../static/Profile.css';

const Profile = () => {
  const { user, logoutUser, verifyUser, sendPasswordRecovery } = useAuth();

  return (
    <div className="profile-container">
      <h1>Welcome to your profile, {user.name}!</h1>
      <div className="profile-section">

      {user.emailVerification ? (
        <div>Your email is verified!</div>
      ) : (
        <>
          <h3>Verify Email</h3>
          <button className="btn verification-btn" onClick={verifyUser}>
            Send Verification Link
          </button>
        </>
      )}


      <h3>Change Password</h3>
      <button className='btn' onClick={sendPasswordRecovery(user.email)}>change Password</button>


      </div>

      <div className="profile-section">
        <button className="btn logout-btn" onClick={logoutUser}>
          Logout
        </button>
      </div>

    </div>
  );
};

export default Profile;
