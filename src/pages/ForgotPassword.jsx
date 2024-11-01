import React, { useRef } from 'react';
import { useAuth } from '../utils/AuthContext';

function ForgotPassword() {
    const emailRef = useRef(null);
    const { sendPasswordRecovery } = useAuth();

    const handlePasswordRecovery = () => {
        const email = emailRef.current.value;
        sendPasswordRecovery(email);
        alert("Check your email for password recovery")
    };

    return (
        <div className="profile-container">
            <h3>Please provide your email for password recovery!</h3>
            <input
                type="text"
                placeholder="Email"
                className="input-field"
                name="email"
                ref={emailRef}
                required
            />
            <button className="btn change-password-btn" onClick={handlePasswordRecovery}>
                Submit Email
            </button>
        </div>
    );
}

export default ForgotPassword;
