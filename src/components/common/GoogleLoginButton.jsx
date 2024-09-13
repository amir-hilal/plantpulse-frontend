import React from 'react';

const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    // Redirect to the backend route that initiates Google OAuth login
    window.location.href = 'http://127.0.0.1:8000/auth/google';
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="bg-info border-round-lg border-none p-3 h-3rem mt-3 text-xs md:text-base w-full flex align-items-center justify-content-center cursor-pointer"
    >
      Continue with Google
    </button>
  );
};

export default GoogleLoginButton;
