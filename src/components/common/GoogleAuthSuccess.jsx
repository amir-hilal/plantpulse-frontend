import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login } from '../../features/auth/authSlice';
import Loading from 'react-loading';

const GoogleAuthSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    // Extract the authorization code from the URL
    const params = new URLSearchParams(location.search);
    const code = params.get('code');

    if (code) {
      // Send the authorization code as a query parameter in the GET request URL
      axios
        .get(`https://api.plantpulselb.com/auth/google/callback?code=${code}`)
        .then((response) => {
          dispatch(login(response.data.user));
          localStorage.setItem('token', response.data.token);

          // Notify success and navigate to a protected route
          toast.success('Logged in successfully!');
          navigate('/home');
        })
        .catch((error) => {
          console.error('Google login failed:', error);
          toast.error('Google login failed. Please try again.');
          navigate('/login');
        });
    } else {
      // If no code is found in the URL, navigate back to login
      toast.error('No authorization code found.');
      navigate('/login');
    }
  }, [location, navigate, dispatch]);

  return (
    <div className="flex justify-content-center align-items-center h-screen">
      <Loading type="spin" color="#019444" height={50} width={50} />
    </div>
  );
};

export default GoogleAuthSuccess;
