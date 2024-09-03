import React from 'react';
import { FaUserPlus } from 'react-icons/fa';

const UserCard = ({ user }) => {
  return (
    <div className="user-card border-round p-3 shadow-1 mb-4 bg-white">
      <div className="flex align-items-center mb-2">
        <img
          src={user.profile_photo_url || '/default-profile.png'}
          alt={user.name}
          className="h-3rem w-3rem border-circle mr-3"
        />
        <div className="flex-1">
          <h3 className="m-0 text-primary">{user.name}</h3>
          <p className="m-0 text-secondary">{user.username}</p>
        </div>
      </div>
      <button className="flex align-items-center bg-primary text-white border-round p-2 cursor-pointer w-full justify-content-center">
        <FaUserPlus className="mr-2" />
        Connect
      </button>
    </div>
  );
};

export default UserCard;
