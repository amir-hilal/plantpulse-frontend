import React, { useEffect } from 'react';
import Loading from 'react-loading';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const GoogleAuthFailure = () => {
  const navigate = useNavigate();

  useEffect(() => {
    toast.error('Google login failed. Please try again.');
    navigate('/login'); // Redirect back to login page
  }, [navigate]);

  return (
    <div className="flex justify-content-center align-items-center h-screen">
      <Loading type="spin" color="#019444" height={50} width={50} />
    </div>
  );
};

export default GoogleAuthFailure;
