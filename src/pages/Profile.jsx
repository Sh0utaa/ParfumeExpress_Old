import { React, useState } from 'react';
import { useAuth } from '../utils/AuthContext';
import '../static/Profile.css';

const Profile = () => {
  const { user, logoutUser } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isVerified, setIsVerified] = useState(user.emailVerification || false);

  const handleVerifyEmail = async () => {
    // Code to send verification email
    alert('Verification email sent!');
    setIsVerified(true); // Update to true if verification succeeds
  };

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
        <h3>Email Verification</h3>
        {isVerified ? (
          <p>Email verified ✔️</p>
        ) : (
          <button className="btn verify-btn" onClick={handleVerifyEmail}>
            Verify Email
          </button>
        )}
      </div>

      <div className="profile-section">
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
