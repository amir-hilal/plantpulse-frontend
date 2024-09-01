import React from 'react';
import {
  FaBirthdayCake,
  FaDownload,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaUser,
} from 'react-icons/fa';
import { useSelector } from 'react-redux';

const AboutSection = () => {
  const user = useSelector((state) => state.auth.userProfile);

  return (
    <div
      className="text-sm md:text-base flex flex-column align-items-center sm:align-items-start mt-2     text-xs md:text-base"
      style={{ width: '100%', maxWidth: '300px' }}
    >
      <h2 className="text-primary ml-1 md:ml-0">About</h2>
      {user.about && (
        <div className="flex align-items-center  ml-1 md:ml-0">
          <p className="text-primary mr-2 my-0">{user.about}</p>
        </div>
      )}

      {user.gender && (
        <div className="flex align-items-center my-2 ml-1 md:ml-0">
          <FaUser className="text-primary mr-2" />
          <span>{user.gender}</span>
        </div>
      )}

      {user.birthday && (
        <div className="flex align-items-center my-2 ml-1 md:ml-0">
          <FaBirthdayCake className="text-primary mr-2" />
          <span>
            Born{' '}
            {new Date(user.birthday).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
        </div>
      )}

      {user.address && (
        <div className="flex align-items-center my-2 ml-1 md:ml-0">
          <FaMapMarkerAlt className="text-primary mr-2" />
          <span>{user.address}</span>
        </div>
      )}

      {user.email && (
        <div className="flex align-items-center my-2 ml-1 md:ml-0">
          <FaEnvelope className="text-primary mr-2" />
          <span>{user.email}</span>
        </div>
      )}

      {user.phone_number && (
        <div className="flex align-items-center my-2 ml-1 md:ml-0">
          <FaPhone className="text-primary mr-2" />
          <span>{user.phone_number}</span>
        </div>
      )}

      <button className="bg-primary border-round border-solid border-primary hover:bg-primary-reverse py-2 mt-4 flex align-items-center justify-content-center cursor-pointer ml-1 md:ml-0">
        <FaDownload className="mr-2" />
        Export Data
      </button>
    </div>
  );
};

export default AboutSection;
