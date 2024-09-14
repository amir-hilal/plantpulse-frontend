import React from 'react';
import googleIcon from '../../assets/svg/Icons/googleIconColored.svg'

const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    // Redirect to the backend route that initiates Google OAuth login
    window.location.href = 'http://127.0.0.1:8000/auth/google';
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="bg-white border-round-lg border-solid border-300 p-3 h-3rem mt-3 text-xs md:text-base w-10 flex align-items-center justify-content-center cursor-pointer"
    >
      <img src={googleIcon} alt="google" width={42} className='pr-3'/>
      Continue with Google
    </button>
  );
};

export default GoogleLoginButton;
