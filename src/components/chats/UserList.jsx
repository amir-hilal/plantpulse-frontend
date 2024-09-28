import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';
import { RiMessage3Line } from 'react-icons/ri';

dayjs.extend(relativeTime);

const UserList = ({
  users,
  onUserSelect,
  searchTerm,
  setSearchTerm,
  lastMessages,
  currentUserId,
  chattedFriends,
  selectedUserId,
  unreadMessages,
}) => {
  const otherFriends = users.filter(
    (user) => !chattedFriends.some((friend) => friend.id === user.id)
  );

  const getLastMessage = (user) => {
    const message = lastMessages[user.id];
    if (!message) return '';

    return message.sender_id === currentUserId
      ? `You: ${message.message}`
      : message.message;
  };

  const getTimeDifference = (user) => {
    const message = lastMessages[user.id];
    if (!message || !message.created_at) return '';

    return dayjs(message.created_at).fromNow();
  };

  return (
    <div className="bg-silver h-full">
      <div className="flex justify-content-between align-items-center">
        <h3 className="m-0" style={styles.header}>
          Chats
        </h3>
        <RiMessage3Line className="m-3 text-xl " />
      </div>

      {/* Search bar */}
      <div className="px-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for friends..."
          className="py-2 pl-2 text-xs md:text-base lg:text-lg w-full surface-100 border-solid surface-border border-round-xl appearance-none outline-none focus:border-primary"
        />
      </div>

      <ul style={styles.list}>
        {/* Chatted Friends */}
        {chattedFriends.length > 0 ? (
          chattedFriends.map((user) => (
            <li
              key={user.id}
              style={{
                ...styles.listItem,
                backgroundColor:
                  user.id === selectedUserId ? '#E8F5E9' : '#fff',
              }}
              onClick={() => onUserSelect(user)}
              className="justify-content-between p-2"
            >
              <div className="mr-1 md:mr-2">
                <img
                  src={
                    user.profile_photo_url || 'https://via.placeholder.com/50'
                  }
                  alt={user.first_name}
                  style={styles.avatar}
                  className="w-2rem md:w-3rem"
                />
              </div>
              <div className="flex justify-content-between w-full">
                <div className="ml-2">
                  <h4
                    style={styles.userName}
                    className="text-xs md:text-base lg:text-lg"
                  >
                    {user.first_name} {user.last_name}
                  </h4>
                  <p style={styles.lastMessage}>{getLastMessage(user)}</p>
                </div>
                <div className="flex flex-column align-items-end">
                  {unreadMessages[user.id] > 0 && (
                    <span
                      style={styles.notificationBadge}
                      className="flex align-items-center justify-content-center"
                    >
                      {unreadMessages[user.id]}
                    </span>
                  )}
                  <span style={styles.time} className="text-xs md:text-base">
                    {getTimeDifference(user)}
                  </span>
                </div>
              </div>
            </li>
          ))
        ) : (
          <p className="px-2 text-xs md:text-base lg:text-lg">
            No chatted friends found.
          </p>
        )}

        {/* Other Friends */}
        <h4 className="px-2 mb-0 mt-4 text-light-grey text-xs">
          Other Friends...
        </h4>
        {otherFriends.length > 0 ? (
          otherFriends.map((user) => (
            <li
              key={user.id}
              style={{
                ...styles.listItem,
                backgroundColor:
                  user.id === selectedUserId ? '#E8F5E9' : '#fff',
              }}
              onClick={() => onUserSelect(user)}
              className="justify-content-between"
            >
              <div
                style={styles.userAvatar}
                className="flex align-items-center p-2"
              >
                <img
                  src={
                    user.profile_photo_url || 'https://via.placeholder.com/50'
                  }
                  alt={user.first_name}
                  style={styles.avatar}
                  className="w-2rem md:w-3rem"
                />
              </div>
              <div>
                <h4 style={styles.userName}>
                  {user.first_name} {user.last_name}
                </h4>
                <p style={styles.lastMessage}>Start a new chat...</p>
              </div>
              <span></span>
            </li>
          ))
        ) : (
          <p className="px-2 mb-0 mt-4 text-light-grey text-xs">
            No other friends found.
          </p>
        )}
      </ul>
    </div>
  );
};

const styles = {
  header: {
    padding: '10px',
    backgroundColor: '#0000',
    textAlign: 'center',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
    marginTop: '10px',
  },
  listItem: {
    display: 'flex',
    cursor: 'pointer',
    borderBottom: '1px solid #eee',
    alignItems: 'center',
  },
  avatar: {
    borderRadius: '50%',
  },
  userName: {
    margin: 0,
    fontWeight: 'bold',
  },
  lastMessage: {
    margin: 0,
    color: '#888',
    fontSize: '8px',
  },
  time: {
    marginLeft: 'auto',
    color: '#aaa',
    width: 'auto',
    textAlign: 'right',
  },
  notificationBadge: {
    backgroundColor: 'red',
    color: '#fff',
    borderRadius: '50%',
    padding: '5px 10px',
    width: '20px',
    height: '20px',
    fontSize: '12px',
    marginRight: '10px',
    marginBottom: '5px',
  },
};

export default UserList;
