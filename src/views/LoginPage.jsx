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
        email: formData.emailOrUsername,
        password: formData.password,
      });
      if (response.status===200) {
        dispatch(login(response.data.user));
        toast.success('Login successful!');
        navigate('/home');
      }
    } catch (error) {
      toast.error(error.response.data.error);
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
      <div className=" flex flex-column align-items-center bg-tint-5 border-round-xl w-6 p-5">
        <ToastContainer />
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
              className="text-xs md:text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
            />
          </div>
          <div className="field col-12 flex p-0">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="text-xs md:text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
              required
            />
          </div>
          <div className="field col-12 flex p-0">
            <Link
              className="font-15 text-grey cursor-pointer"
              to="/forgot-password"
            >
              Forgot Password?
            </Link>
          </div>
          <button type="submit" className="p-button w-full">
            {isLoading ? (
              <Loading type="spin" color="#fff" height={20} width={20} />
            ) : (
              'Login'
            )}
          </button>
          <div className="field col-12 flex p-0">
            <p className="font-15 text-grey cursor-pointer">
              Don’t have an account?{' '}
              <Link to="/register">Sign up for PlantPulse</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
