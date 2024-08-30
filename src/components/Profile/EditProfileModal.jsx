import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const EditProfileModal = ({ isOpen, onClose, userProfile }) => {
  const [formData, setFormData] = useState({
    firstName: userProfile.first_name,
    lastName: userProfile.last_name,
    phoneNumber: userProfile.phone_number || '',
    address: userProfile.address || '',
    birthday: userProfile.birthday || '',
    gender: userProfile.gender || '',
    about: userProfile.about || '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement the logic to update the profile
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-content-center align-items-center bg-dark bg-opacity-50">
      <div className="bg-white border-round-lg p-4 w-11 sm:w-6 md:w-5 lg:w-4">
        <button
          onClick={onClose}
          className="text-secondary absolute top-0 right-0 mt-2 mr-2 cursor-pointer"
        >
          <FaTimes />
        </button>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-content-center mb-4">
            <img
              src={userProfile.profile_photo_url}
              alt="Profile"
              className="h-7rem w-7rem border-circle shadow-1"
            />
          </div>
          <div className="grid grid-nogutter gap-4">
            <div className="col-6">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full"
              />
            </div>
            <div className="col-6">
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full"
              />
            </div>
            <div className="col-6">
              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full"
              />
            </div>
            <div className="col-6">
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className="w-full"
              />
            </div>
            <div className="col-6">
              <input
                type="date"
                name="birthday"
                placeholder="Birthday"
                value={formData.birthday}
                onChange={handleChange}
                className="w-full"
              />
            </div>
            <div className="col-6">
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full"
              >
                <option value="">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="col-12">
              <textarea
                name="about"
                placeholder="About you..."
                value={formData.about}
                onChange={handleChange}
                className="w-full"
                rows="3"
              ></textarea>
            </div>
          </div>
          <div className="flex justify-content-end mt-4">
            <button type="submit" className="p-button w-full">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
