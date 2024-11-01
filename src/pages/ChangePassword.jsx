import { React, useRef, useEffect } from 'react';
import { account } from '../appwriteConfig';
import '../static/Profile.css';
import { useNavigate } from 'react-router-dom';

function ChangePassword() {
    const navigate = useNavigate();
    const changePasswordForm = useRef(null);

    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("userId");
    const secret = urlParams.get("secret");

    useEffect(() => {
        // Redirect to home if userId or secret is missing
        if (!userId || !secret) {
            navigate("/");
        }
    }, [userId, secret, navigate]);

    const handleChangePassword = async (e) => {
        e.preventDefault();

        const password1 = changePasswordForm.current.password1.value;
        const password2 = changePasswordForm.current.password2.value;

        if (password1 !== password2) {
            alert("Passwords do not match");
            return;
        }

        try {
            await account.updateRecovery(userId, secret, password1, password2);
            alert("Password changed successfully!");
            navigate("/login");
        } catch (error) {
            alert("Password change failed. Please try again.");
            console.error(error);
        }
    };

    return (
        <form ref={changePasswordForm} onSubmit={handleChangePassword}>
            <div className="profile-container">
                <h3>Change Password</h3>
                <input
                    type="password"
                    placeholder="New Password"
                    className="input-field"
                    name="password1"
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm New Password"
                    className="input-field"
                    name="password2"
                    required
                />
                <button className="btn change-password-btn" type="submit">
                    Change Password
                </button>
            </div>
        </form>
    );
}

export default ChangePassword;
