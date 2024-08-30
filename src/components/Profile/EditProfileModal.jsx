import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';

const EditProfileModal = ({ isOpen, onClose, userProfile }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    address: '',
    birthday: '',
    gender: '',
    about: '',
    profile_photo_url: '',
  });

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
      setFormData({
        first_name: userProfile.first_name || '',
        last_name: userProfile.last_name || '',
        phone_number: userProfile.phone_number || '',
        address: userProfile.address || '',
        birthday: userProfile.birthday || '',
        gender: userProfile.gender || '',
        about: userProfile.about || '',
        profile_photo_url: userProfile.profile_photo_url || '',
      });
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen, userProfile]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex justify-content-center align-items-center"
      style={{ backgroundColor: 'rgba(22, 29, 33, 0.5)' }}
    >
      <div className="relative bg-white border-round-xl p-6 w-11 sm:w-8 md:w-8 lg:w-8 shadow-4 overflow-x-auto md:overflow-hidden h-30rem flex justify-content-center align-items-center">
        <button
          onClick={onClose}
          className="text-secondary bg-transparent absolute top-0 right-0 mt-3 mr-3 cursor-pointer border-none p-0"
        >
          <FaTimes className="text-2xl text-secondary" />
        </button>

        <form onSubmit={handleSubmit} className="flex flex-column mt-8 md:mt-0">
          <div className="flex flex-column sm:flex-row align-items-center mt-8 md:mt-0">
            <img
              src={formData.profile_photo_url}
              alt="Profile"
              className="h-8rem w-8rem border-circle shadow-2 mr-0 mb-3 mt-8 sm:mt-0 sm:mr-5 sm:mb-0"
            />

            <div className="formgrid grid ml-0 mr-0">
              <div className="field col-12 md:col-6 flex flex-column p-0 md:pr-1">
                <label htmlFor="first_name">Firstname</label>
                <input
                  type="text"
                  name="first_name"
                  placeholder="First Name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                  className="bg-tint-5 text-xs md:text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-auto"
                />
              </div>
              <div className="field col-12 md:col-6 flex flex-column p-0 md:pl-1">
                <label htmlFor="last_name">Lastname</label>
                <input
                  type="text"
                  name="last_name"
                  placeholder="Last Name"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                  className="bg-tint-5 text-xs md:text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-auto"
                />
              </div>
              <div className="field col-12 md:col-6 flex flex-column p-0 md:pr-1">
                <label htmlFor="phone_number">Phone</label>
                <input
                  type="tel"
                  name="phone_number"
                  placeholder="Phone"
                  value={formData.phone_number}
                  onChange={handleChange}
                  className="bg-tint-5 text-xs md:text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-auto"
                />
              </div>
              <div className="field col-12 md:col-6 flex flex-column p-0 md:pl-1">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                  className="bg-tint-5 text-xs md:text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-auto"
                />
              </div>
              <div className="field col-12 md:col-6 flex flex-column p-0 md:pr-1">
                <label htmlFor="birthday">Birthday</label>
                <input
                  type="date"
                  name="birthday"
                  placeholder="Birthday"
                  value={formData.birthday}
                  onChange={handleChange}
                  className="bg-tint-5 text-xs md:text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-auto"
                />
              </div>
              <div className="relative field col-12 md:col-6 flex flex-column p-0 md:pl-1">
                <label htmlFor="gender">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="bg-tint-5 text-xs md:text-base text-color surface-overlay p-2 h-full border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-auto"
                >
                  <option value="" disabled>
                    Gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                <IoIosArrowDown className="absolute dropdown-arrow-position pointer-events-none text-color" />
              </div>
              <div className="field col-12 flex flex-column p-0">
                <label htmlFor="about">About</label>
                <textarea
                  id="about"
                  name="about"
                  type="text"
                  rows="4"
                  value={formData.about}
                  onChange={handleChange}
                  className="bg-tint-5 text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-auto"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="flex justify-content-end mt-4">
            <button
              type="submit"
              className="w-10rem border-none bg-primary text-white border-round py-2 cursor-pointer"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
