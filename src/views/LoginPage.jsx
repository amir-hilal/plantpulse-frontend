import React, { useState } from 'react';
import Loading from 'react-loading';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../assets/images/Logo_black.png';
import { login } from '../features/auth/authSlice';
import api from '../services/api';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await api.post('/login', {
        email_or_username: formData.emailOrUsername,
        password: formData.password,
      });
      if (response.status === 200) {
        dispatch(login(response.data.user));
        localStorage.setItem('token', response.data.token);
        toast.success('Login successful!');
        navigate('/home');
      }
    } catch (error) {
      if (!error.response) {
        toast.error('Unable to connect to the server. Please try again later.');
      } else {
        toast.error(error.response.data.error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-column justify-content-center align-items-center">
      <img
        src={logo}
        alt="PlantPulse"
        className="logo mb-6 cursor-pointer"
        onClick={() => navigate('/')}
      />
      <div className=" flex flex-column align-items-center bg-tint-5 border-round-3xl w-9 md:w-6 lg:w-4 p-4">
        <div className="flex flex-column align-items-center w-10">
          <h2 className="text-center text-secondary">Log in to PlantPulse</h2>
        </div>
        <form className="formgrid grid w-12 md:w-10" onSubmit={handleSubmit}>
          <div className="field col-12 flex p-0">
            <input
              type="text"
              name="emailOrUsername"
              placeholder="Email or Username"
              value={formData.emailOrUsername}
              onChange={handleChange}
              required
              className="h-3rem text-xs md:text-base text-color bg-tint-5 p-3 border-1 border-solid border-400 border-round-lg appearance-none outline-none focus:border-primary w-full"
            />
          </div>
          <div className="field col-12 flex p-0">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className=" h-3rem text-xs md:text-base text-color bg-tint-5 p-3 border-1 border-solid border-400 border-round-lg appearance-none outline-none focus:border-primary w-full"
              required
            />
          </div>
          <div className="field col-12 flex p-0">
            <Link
              className="text-xs md:text-base text-grey cursor-pointer"
              to="/forgot-password"
            >
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            className="bg-primary border-round-lg border-none p-3 h-3rem  text-xs md:text-base w-full flex align-items-center justify-content-center cursor-pointer"
          >
            {isLoading ? (
              <Loading type="spin" color="#fff" height={15} width={15} />
            ) : (
              'Login'
            )}
          </button>
          <div className="field col-12 flex p-0">
            <p className="text-xs md:text-base text-grey cursor-pointer">
              Don’t have an account?{' '}
              <Link to="/register">Sign up for PlantPulse</Link>
            </p>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
