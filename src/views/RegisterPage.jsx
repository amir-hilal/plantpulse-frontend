import React, { useState } from 'react';
import Loading from 'react-loading';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../assets/images/Logo_black.png';
import GoogleLoginButton from '../components/common/GoogleLoginButton';
import { login } from '../features/auth/authSlice';
import api from '../services/api';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
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

    if (formData.password !== formData.password_confirmation) {
      toast.error('Passwords do not match!');
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.post('/register', {
        first_name: formData.first_name,
        last_name: formData.last_name,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.password_confirmation,
      });
      if (response.status === 201) {
        dispatch(login(response.data.user));
        localStorage.setItem('token', response.data.token);
        toast.success('Registration successful!', response.data.message);
        navigate('/home');
      }
    } catch (error) {
      return;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-column justify-content-center align-items-center">
      <img
        src={logo}
        alt="PlantPulse"
        className="logo mb-3 cursor-pointer"
        onClick={() => navigate('/')}
      />
      <div className=" flex flex-column align-items-center bg-tint-5 border-round-3xl w-9 md:w-6 xl:w-4 p-4">
        <div className="flex flex-column align-items-center w-10">
          <h2 className="text-center text-secondary">Create New Account</h2>
        </div>
        <form className="formgrid grid w-10" onSubmit={handleSubmit}>
          <div className=" field col-12 md:col-6 flex p-0 md:pr-1">
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              value={formData.first_name}
              onChange={handleChange}
              required
              className=" h-3rem bg-tint-5 p-3 border-400 border-round-lg text-xs md:text-base text-color p-2 border-1 border-solid appearance-none outline-none focus:border-primary w-full"
            />
          </div>

          <div className="field col-12 md:col-6 flex p-0 md:pl-1">
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              value={formData.last_name}
              onChange={handleChange}
              required
              className=" h-3rem bg-tint-5 p-3 border-400 border-round-lg text-xs md:text-base text-color p-2 border-1 border-solid appearance-none outline-none focus:border-primary w-full"
            />
          </div>
          <div className="field col-12 flex p-0">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
              className=" h-3rem bg-tint-5 p-3 border-400 border-round-lg text-xs md:text-base text-color p-2 border-1 border-solid appearance-none outline-none focus:border-primary w-full"
            />
          </div>
          <div className="field col-12 flex p-0">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className=" h-3rem bg-tint-5 p-3 border-400 border-round-lg text-xs md:text-base text-color p-2 border-1 border-solid appearance-none outline-none focus:border-primary w-full"
            />
          </div>
          <div className="field col-12 flex p-0">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className=" h-3rem bg-tint-5 p-3 border-400 border-round-lg text-xs md:text-base text-color p-2 border-1 border-solid appearance-none outline-none focus:border-primary w-full"
            />
          </div>
          <div className="field col-12 flex p-0">
            <input
              type="password"
              name="password_confirmation"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className=" h-3rem bg-tint-5 p-3 border-400 border-round-lg text-xs md:text-base text-color p-2 border-1 border-solid appearance-none outline-none focus:border-primary w-full"
            />
          </div>

          <button
            type="submit"
            className="bg-primary border-round-lg border-none p-3 h-3rem  text-xs md:text-base w-full flex align-items-center justify-content-center cursor-pointer"
          >
            {isLoading ? (
              <Loading type="spin" color="#fff" height={15} width={15} />
            ) : (
              'Sign Up'
            )}
          </button>
          <div className="field col-12 flex p-0">
            <p className="font-15 text-grey cursor-pointer text-xs md:text-base">
              Already have an account? <Link to="/login">Log In</Link>
            </p>
          </div>
        </form>
        <div className="flex w-full align-items-center justify-content-center w-10">
          <hr className="w-5" />
          <p className="m-0">or</p>
          <hr className="w-5" />
        </div>
        <GoogleLoginButton />
      </div>
      <ToastContainer />
    </div>
  );
};

export default RegisterPage;
