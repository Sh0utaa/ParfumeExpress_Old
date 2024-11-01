import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { account } from "../appwriteConfig";

function VerifyEmail() {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get("userId");
  const secret = urlParams.get("secret");
  const [verificationStatus, setVerificationStatus] = useState(null); // Track verification status

  useEffect(() => {
    // Redirect if parameters are missing
    if (!userId || !secret) {
      navigate("/");
      return;
    }

    // Attempt to verify the user
    const updateUserVerification = async () => {
      try {
        await account.updateVerification(userId, secret);
        setVerificationStatus("success");
      } catch (error) {
        setVerificationStatus("failed");
        console.error("Verification failed", error);
      }
    };

    updateUserVerification();
  }, [userId, secret, navigate]);

  // Render based on verification status
  return (
    <div>
      {verificationStatus === "success" && <div>User Verified successfully!</div>}
      {verificationStatus === "failed" && <div>Verification failed. Please try again.</div>}
      {!verificationStatus && <div>Verifying...</div>}
    </div>
  );
}

export default VerifyEmail;
