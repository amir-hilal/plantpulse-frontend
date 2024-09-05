import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import EditProfileModal from './EditProfileModal';
import { useDispatch } from 'react-redux';
import {
  sendFriendRequest,
  acceptFriendRequest,
  declineFriendRequest,
  removeFriend,
} from '../../features/community/friendsSlice';

const ProfileHeader = ({
  user_id,
  profile_photo_url,
  cover_photo_url,
  first_name,
  last_name,
  phone_number,
  username,
  gender,
  email,
  about,
  address,
  birthday,
  isOwner,
  relationship_status
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleSendRequest = () => {
    dispatch(sendFriendRequest(user_id));
  };

  const handleAcceptRequest = () => {
    dispatch(acceptFriendRequest(user_id));
  };

  const handleDeclineRequest = () => {
    dispatch(declineFriendRequest(user_id));
  };

  const handleRemoveFriend = () => {
    dispatch(removeFriend(user_id));
  };

  const renderActionButtons = () => {
    switch (relationship_status) {
      case 'connected':
        return (
          <div className="flex">
            <button
              className="sm:w-9rem py-2 sm:mr-2 border-round border-solid border-primary bg-tint-5 text-primary hover:bg-primary hover:text-tint-5 cursor-pointer flex justify-content-center align-items-center"
              onClick={handleRemoveFriend}
            >
              Remove
            </button>
            <button className="sm:w-9rem py-2 border-round border-solid border-primary bg-tint-5 text-primary hover:bg-primary hover:text-tint-5 cursor-pointer flex justify-content-center align-items-center ml-2">
              Message
            </button>
          </div>
        );
      case 'request_sent':
        return (
          <button className="sm:w-9rem py-2 border-round border-solid border-primary bg-tint-5 text-primary cursor-pointer flex justify-content-center align-items-center">
            Request Sent
          </button>
        );
      case 'request_received':
        return (
          <div className="flex">
            <button
              className="sm:w-9rem py-2 sm:mr-2 border-round border-solid border-primary bg-tint-5 text-primary hover:bg-primary hover:text-tint-5 cursor-pointer flex justify-content-center align-items-center"
              onClick={handleAcceptRequest}
            >
              Accept
            </button>
            <button
              className="sm:w-9rem py-2 border-round border-solid border-primary bg-tint-5 text-primary hover:bg-primary hover:text-tint-5 cursor-pointer flex justify-content-center align-items-center ml-2"
              onClick={handleDeclineRequest}
            >
              Decline
            </button>
          </div>
        );
      case 'not_connected':
      default:
        return (
          <button
            className="sm:w-9rem py-2 border-round border-solid border-primary bg-tint-5 text-primary hover:bg-primary hover:text-tint-5 cursor-pointer flex justify-content-center align-items-center"
            onClick={handleSendRequest}
          >
            Connect
          </button>
        );
    }
  };

  return (
    <div className="profile-header flex flex-column align-items-center w-full md:w-10">
      {/* Cover Photo */}
      <div
        className="relative cover-photo h-10rem bg-light-grey border-noround md:border-round-lg border-noround-bottom w-full"
        style={{
          backgroundImage: `url(${cover_photo_url})`,
          backgroundSize: 'cover',
        }}
      >
        {isOwner && (
          <button className="absolute bottom-0 right-0 mb-3 mr-4 sm:mb-3 sm:mr-6 sm:w-9rem bg-white text-primary border-solid border-white border-round py-2 hover:bg-primary hover:border-primary hover:text-primary cursor-pointer flex justify-content-center align-items-center">
            <span className="hidden sm:block">Edit Cover Photo</span>
            <FaEdit className="block sm:hidden text-xl" />
          </button>
        )}
      </div>

      {/* Profile Picture and Basic Info */}
      <div className="profile-info flex bg-tint-5 border-noround md:border-round-xl border-noround-top w-full">
        <div className="relative flex align-items-center w-full pt-7 px-4 pb-2 sm:p-4 justify-content-between">
          <img
            src={profile_photo_url}
            alt="Profile"
            className="absolute profile-picture-position h-7rem w-7rem border-circle shadow-1"
          />
          <div className="w-0 md:w-3 "></div>
          <div className="absolute left-38 md:static translate-x-0">
            <h2 className="text-xl text-primary m-0">
              {first_name} {last_name}
            </h2>
            <p className="text-secondary m-0 text-center sm:text-left">
              {username}
            </p>
          </div>
          <div className="ml-2 ml-auto">
            {isOwner ? (
              <button
                className="sm:w-9rem py-2 sm:mr-4 border-round border-solid border-primary bg-tint-5 text-primary hover:bg-primary hover:text-tint-5 cursor-pointer flex justify-content-center align-items-center"
                onClick={() => setIsModalOpen(true)}
              >
                <span className="hidden sm:block">Edit Profile</span>
                <FaEdit className="block sm:hidden text-xl" />
              </button>
            ) : (
              renderActionButtons()
            )}
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isOwner && (
        <EditProfileModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          userProfile={{
            first_name,
            last_name,
            username,
            phone_number,
            email,
            about,
            birthday,
            address,
            profile_photo_url,
            cover_photo_url,
            gender,
          }}
        />
      )}
    </div>
  );
};

export default ProfileHeader;
