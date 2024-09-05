import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
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

const UserCard = ({ user, isOwner }) => {
  const [currentStatus, setCurrentStatus] = useState(user.relationship_status);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentStatus(user.relationship_status);
  }, [user.relationship_status]);

  const handleSendRequest = () => {
    dispatch(sendFriendRequest(user.id))
      .then(() => {
        toast.success('Friend request sent successfully');
        setCurrentStatus('request_sent');
      })
      .catch(() => {
        toast.error('Failed to send friend request. Please try again.');
      });
  };

  const handleAcceptRequest = () => {
    dispatch(acceptFriendRequest(user.id))
      .then(() => {
        toast.success('Friend request accepted');
        setCurrentStatus('connected');
      })
      .catch(() => {
        toast.error('Failed to accept friend request. Please try again.');
      });
  };

  const handleDeclineRequest = () => {
    dispatch(declineFriendRequest(user.id))
      .then(() => {
        toast.success('Friend request declined');
        setCurrentStatus('not_connected');
      })
      .catch(() => {
        toast.error('Failed to decline friend request. Please try again.');
      });
  };

  const handleRemoveFriend = () => {
    dispatch(removeFriend(user.id))
      .then(() => {
        toast.success('Friend removed successfully');
        setCurrentStatus('not_connected');
      })
      .catch(() => {
        toast.error('Failed to remove friend. Please try again.');
      });
  };

  const handleNavigateToProfile = () => {
    navigate(`/profile/${user.username}`);
  };

  const renderButton = () => {
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
          <>
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
          </>
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
    <div className="user-card border-round p-3 shadow-1 mb-4 bg-white">
      <div className="flex align-items-center mb-2">
        <img
          src={user.profile_photo_url}
          alt={user.name}
          className="h-3rem w-3rem border-circle mr-3"
        />
        <div className="flex-1">
          <div onClick={handleNavigateToProfile} className="cursor-pointer">
            <h3 className="m-0 text-base text-primary">
              {user.first_name} {user.last_name}
            </h3>
            <p className="m-0 text-xs text-secondary">{user.username}</p>
          </div>
        </div>
        {isOwner && renderButton()}
      </div>
    </div>
  );
};

export default UserCard;
