import React from 'react';
import { FaUserPlus } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import {
  acceptFriendRequest,
  declineFriendRequest,
  removeFriend,
  sendFriendRequest,
} from '../../features/community/friendsSlice';

const UserCard = ({ user, status }) => {
  let condition = '';
  console.log(user);
  // const { relationship_status } = user;
  const dispatch = useDispatch();

  const handleSendRequest = () => {
    condition = 'request_sent'
    dispatch(sendFriendRequest(user.id));
  };

  const handleAcceptRequest = () => {
    dispatch(acceptFriendRequest(user.id));
  };

  const handleDeclineRequest = () => {
    dispatch(declineFriendRequest(user.id));
  };

  const handleRemoveFriend = () => {
    dispatch(removeFriend(user.id));
  };
  switch (status) {
    case 'pending':
      condition = 'request_received';
      break;

    default:
      condition = user.relationship_status;
      break;
  }
  const renderButton = () => {
    switch (condition) {
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
