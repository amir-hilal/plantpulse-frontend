import React from 'react';
import {
  FaBirthdayCake,
  FaDownload,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaUser,
} from 'react-icons/fa';

const AboutSection = ({ profileData, isOwner }) => {
  return (
    <div
      className="text-sm md:text-base flex flex-column align-items-center sm:align-items-start mt-2 text-xs md:text-base"
      style={{ width: '100%', maxWidth: '300px' }}
    >
      {profileData.about && (
        <div className="flex align-items-center my-2 ml-1 md:ml-0">
          <p className="text-primary mr-2 my-0">{profileData.about}</p>
        </div>
      )}

      {profileData.gender && (
        <div className="flex align-items-center my-2 ml-1 md:ml-0">
          <FaUser className="text-primary mr-2" />
          <span>{profileData.gender}</span>
        </div>
      )}

      {profileData.birthday && (
        <div className="flex align-items-center my-2 ml-1 md:ml-0">
          <FaBirthdayCake className="text-primary mr-2" />
          <span>
            Born{' '}
            {new Date(profileData.birthday).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
        </div>
      )}

      {profileData.address && (
        <div className="flex align-items-center my-2 ml-1 md:ml-0">
          <FaMapMarkerAlt className="text-primary text-2xl mr-2 " />
          <span>{profileData.address}</span>
        </div>
      )}

      {profileData.email && (
        <div className="flex align-items-center my-2 ml-1 md:ml-0">
          <FaEnvelope className="text-primary mr-2" />
          <span>{profileData.email}</span>
        </div>
      )}

      {profileData.phone_number && (
        <div className="flex align-items-center my-2 ml-1 md:ml-0">
          <FaPhone className="text-primary mr-2" />
          <span>{profileData.phone_number}</span>
        </div>
      )}
      {isOwner && (
        <button className="bg-primary border-round-lg border-solid border-primary hover:bg-primary-reverse py-2 mt-4 flex align-items-center justify-content-center cursor-pointer ml-1 md:ml-0">
          <FaDownload className="mr-2" />
          Export Data
        </button>
      )}
    </div>
  );
};

export default AboutSection;
