import React from 'react';
import emptyProfilePicture from '../../assets/images/empty-profile.png';

const ProfileHeader = ({
  profilePicture,
  coverPhoto,
  firstName,
  lastName,
  username,
}) => {
  return (
    <div className="profile-header flex flex-column align-items-center w-9">
      {/* Cover Photo */}
      <div
        className="relative cover-photo h-10rem bg-light-grey border-round-lg border-noround-bottom w-full"
        style={{
          backgroundImage: `url(${coverPhoto})`,
          backgroundSize: 'cover', // Ensure the cover photo is displayed correctly
        }}
      >
        <button className="absolute bottom-0 right-0 mb-3 mr-6 w-9rem bg-white text-primary border-solid border-white border-round py-2 hover:bg-primary hover:border-primary hover:text-primary cursor-pointer">
          Edit Cover Photo
        </button>
      </div>

      {/* Profile Picture and Basic Info */}
      <div className="profile-info flex bg-tint-5 border-round-xl border-noround-top w-full">
        <div className="relative flex align-items-center w-full p-4">
          <img
            src={profilePicture ? profilePicture : emptyProfilePicture}
            alt="Profile"
            className="absolute h-6rem w-6rem border-circle top-minus-60 shadow-1"
          />
          <div className="w-2"></div>
          <div>
            <h2 className="text-xl text-primary m-0">
              {firstName} {lastName}
            </h2>
            <p className="text-secondary m-0">{username}</p>
          </div>
          <div className="ml-auto">
            <button className="w-9rem py-2 mr-4 border-round border-solid border-primary bg-tint-5 text-primary hover:bg-primary hover:text-tint-5 cursor-pointer">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
