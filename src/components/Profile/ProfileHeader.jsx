import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import AddFriendIcon from '../../assets/svg/Icons/Add user.svg';
import CheckIcon from '../../assets/svg/Icons/Check.svg';
import ClockIcon from '../../assets/svg/Icons/Clock.svg';
import CloseIcon from '../../assets/svg/Icons/Close.svg';
import RemoveIcon from '../../assets/svg/Icons/delete.svg';
import MessageIcon from '../../assets/svg/Icons/Message square.svg';

import {
  acceptFriendRequest,
  declineFriendRequest,
  removeFriend,
  sendFriendRequest,
} from '../../features/community/friendsSlice';
import EditProfileModal from './EditProfileModal';
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
  relationship_status,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [currentStatus, setCurrentStatus] = useState(relationship_status);

  const handleSendRequest = () => {
    dispatch(sendFriendRequest(user_id))
      .then(() => {
        toast.success('Friend request sent successfully');
        setCurrentStatus('request_sent');
      })
      .catch(() => {
        toast.error('Failed to send friend request. Please try again.');
      });
  };

  const handleAcceptRequest = () => {
    dispatch(acceptFriendRequest(user_id))
      .then(() => {
        toast.success('Friend request accepted');
        setCurrentStatus('connected');
      })
      .catch(() => {
        toast.error('Failed to accept friend request. Please try again.');
      });
  };

  const handleDeclineRequest = () => {
    dispatch(declineFriendRequest(user_id))
      .then(() => {
        toast.success('Friend request declined');
        setCurrentStatus('not_connected');
      })
      .catch(() => {
        toast.error('Failed to decline friend request. Please try again.');
      });
  };

  const handleRemoveFriend = () => {
    dispatch(removeFriend(user_id))
      .then(() => {
        toast.success('Friend removed successfully');
        setCurrentStatus('not_connected');
      })
      .catch(() => {
        toast.error('Failed to remove friend. Please try again.');
      });
  };

  const renderActionButtons = () => {
    switch (currentStatus) {
      case 'connected':
        return (
          <div className="flex">
            <button
              className="flex flex-column text-dark-grey align-items-center bg-transparent border-none cursor-pointer justify-content-center"
              onClick={handleRemoveFriend}
            >
              <img src={RemoveIcon} alt="Remove Friend" className="icon" />
              <span className="font-8 mt-1">Remove</span>
            </button>
            <button className="flex flex-column text-dark-grey align-items-center bg-transparent border-none cursor-pointer justify-content-center">
              <img src={MessageIcon} alt="Message" className="icon" />
              <span className="font-8 mt-1"> Message</span>
            </button>
          </div>
        );
      case 'request_sent':
        return (
          <button className="flex flex-column text-dark-grey align-items-center bg-transparent border-none justify-content-center">
            <img src={ClockIcon} alt="Request Sent" className="icon" />
            <span className="font-8 mt-1"> Request Sent</span>
          </button>
        );
      case 'request_received':
        return (
          <div className="flex">
            <button
              className="flex flex-column text-dark-grey align-items-center bg-transparent border-none cursor-pointer justify-content-center"
              onClick={handleAcceptRequest}
            >
              <img src={CheckIcon} alt="Accept" className="icon" />
              <span className="font-8 mt-1"> Accept</span>
            </button>
            <button
              className="flex flex-column text-dark-grey align-items-center bg-transparent border-none cursor-pointer justify-content-center ml-2"
              onClick={handleDeclineRequest}
            >
              <img src={CloseIcon} alt="Decline" className="icon" />
              <span className="font-8 mt-1"> Decline</span>
            </button>
          </div>
        );
      case 'not_connected':
      default:
        return (
          <button
            className="flex flex-column text-dark-grey align-items-center bg-transparent border-none cursor-pointer justify-content-center"
            onClick={handleSendRequest}
          >
            <img src={AddFriendIcon} alt="Connect" className="icon" />
            <span className="font-8 mt-1"> Connect</span>
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
