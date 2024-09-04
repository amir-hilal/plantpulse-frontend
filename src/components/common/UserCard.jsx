import React, { useState, useEffect } from 'react';
import { FaUserPlus } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify'; // Assuming you are using react-toastify for notifications
import {
  acceptFriendRequest,
  declineFriendRequest,
  removeFriend,
  sendFriendRequest,
} from '../../features/community/friendsSlice';

const UserCard = ({ user }) => {
  const [currentStatus, setCurrentStatus] = useState(user.relationship_status); // Use relationship_status directly from the user prop
  const dispatch = useDispatch();

  useEffect(() => {
    // Update currentStatus when user.relationship_status changes
    setCurrentStatus(user.relationship_status);
  }, [user.relationship_status]);

  const handleSendRequest = () => {
    dispatch(sendFriendRequest(user.id))
      .then(() => {
        toast.success('Friend request sent successfully');
        setCurrentStatus('request_sent'); // Update status on successful request
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

  const renderButton = () => {
    switch (currentStatus) {
      case 'connected':
        return (
          <div className="flex">
            <button
              className="flex align-items-center bg-primary text-white border-round p-2 cursor-pointer justify-content-center"
              onClick={handleRemoveFriend}
            >
              Remove
            </button>
            <button className="flex align-items-center bg-primary text-white border-round p-2 cursor-pointer justify-content-center ml-2">
              Message
            </button>
          </div>
        );
      case 'request_sent':
        return (
          <button className="flex align-items-center bg-primary text-white border-round p-2 cursor-pointer justify-content-center">
            Request Sent
          </button>
        );
      case 'request_received':
        return (
          <>
            <button
              className="flex align-items-center bg-primary text-white border-round p-2 cursor-pointer justify-content-center"
              onClick={handleAcceptRequest}
            >
              Accept
            </button>
            <button
              className="flex align-items-center bg-primary text-white border-round p-2 cursor-pointer justify-content-center ml-2"
              onClick={handleDeclineRequest}
            >
              Decline
            </button>
          </>
        );
      case 'not_connected':
      default:
        return (
          <button
            className="flex align-items-center bg-primary text-white border-round p-2 cursor-pointer justify-content-center"
            onClick={handleSendRequest}
          >
            <FaUserPlus className="mr-2" />
            Connect
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
          <h3 className="m-0 text-base text-primary">
            {user.first_name} {user.last_name}
          </h3>
          <p className="m-0 text-xs text-secondary">{user.username}</p>
        </div>
        {renderButton()}
      </div>
    </div>
  );
};

export default UserCard;
