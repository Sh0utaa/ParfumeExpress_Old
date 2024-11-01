import { React, useState } from 'react';
import { useAuth } from '../utils/AuthContext';
import '../static/Profile.css';

const Profile = () => {
  const { user, logoutUser, verifyUser } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isVerified, setIsVerified] = useState(user.emailVerification || false);


  const handleChangePassword = async () => {
    // Code to change password
    alert('Password changed successfully!');
    setCurrentPassword('');
    setNewPassword('');
  };

  const handleDeleteAccount = async () => {
    // Code to delete account
    alert('Account deleted.');
    logoutUser();
  };

  return (
    <div className="profile-container">
      <h1>Welcome to your profile, {user.name}!</h1>
      <div className="profile-section">
        <h3>Verify Email</h3>
        <button className="btn verificaiton-btn" onClick={verifyUser}>
          Send Verification Link
        </button>

        <h3>Change Password</h3>
        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="input-field"
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="input-field"
        />
        <button className="btn change-password-btn" onClick={handleChangePassword}>
          Change Password
        </button>
      </div>

      <div className="profile-section">
        <button className="btn logout-btn" onClick={logoutUser}>
          Logout
        </button>
      </div>

      <div className="profile-section">
        <button className="btn delete-btn" onClick={handleDeleteAccount}>
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Profile;
