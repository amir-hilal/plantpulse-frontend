import React from 'react';
import { RiMessage3Line } from 'react-icons/ri';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';  // Import relative time plugin

dayjs.extend(relativeTime);  // Use relative time for time difference calculations

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
  const chattedFriendsList = users.filter((user) =>
    chattedFriends.includes(String(user.id))
  );
  const notChattedFriendsList = users.filter(
    (user) => !chattedFriends.includes(String(user.id))
  );

  const getLastMessage = (user) => {
    const message = lastMessages[user.id];
    if (!message) return 'No message yet...';

    return message.sender_id === currentUserId
      ? `You: ${message.message}`
      : message.message;
  };

  const getTimeDifference = (user) => {
    const message = lastMessages[user.id];
    if (!message || !message.created_at) return '';

    // Calculate the time difference using dayjs and display it as relative time
    return dayjs(message.created_at).fromNow();
  };

  return (
    <div className="bg-silver h-full">
      <div className="flex justify-content-between align-items-center">
        <h3 className="m-0" style={styles.header}>
          Chats
        </h3>
        <RiMessage3Line className='m-3 text-xl ' />
      </div>

      {/* Search bar */}

      <div className="px-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for friends..."
          className="py-2 pl-6 w-full surface-100 border-solid surface-border border-round-xl appearance-none outline-none focus:border-primary"
        />
      </div>

      <ul style={styles.list}>
        {chattedFriendsList.length > 0 ? (
          chattedFriendsList.map((user) => (
            <li
              key={user.id}
              style={{
                ...styles.listItem,
                backgroundColor:
                  user.id === selectedUserId ? '#E8F5E9' : '#fff',
              }}
              onClick={() => onUserSelect(user)}
            >
              <div style={styles.userAvatar}>
                <img
                  src={
                    user.profile_photo_url || 'https://via.placeholder.com/50'
                  }
                  alt={user.first_name}
                  style={styles.avatar}
                />
              </div>
              <div>
                <h4 style={styles.userName}>
                  {user.first_name} {user.last_name}
                </h4>
                <p style={styles.lastMessage}> {getLastMessage(user)}</p>
              </div>
              {/* Notification badge */}
              {unreadMessages[user.id] > 0 && (
                <span style={styles.notificationBadge}>
                  {unreadMessages[user.id]}
                </span>
              )}
              <span style={styles.time}>{getTimeDifference(user)}</span>
            </li>
          ))
        ) : (
          <p className="px-2">No chatted friends found.</p>
        )}

        <h4
          className="px-2 mb-0 mt-4 text-light-grey text-xs"
          style={styles.sectionHeader}
        >
          Other Friends...
        </h4>
        {notChattedFriendsList.length > 0 ? (
          notChattedFriendsList.map((user) => (
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
              <div style={styles.userAvatar}>
                <img
                  src={
                    user.profile_photo_url || 'https://via.placeholder.com/50'
                  }
                  alt={user.first_name}
                  style={styles.avatar}
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
  sectionHeader: {
    fontSize: '14px',
    fontWeight: 'normal',
  },
  listItem: {
    display: 'flex',
    cursor: 'pointer',
    padding: '10px',
    borderBottom: '1px solid #eee',
    alignItems: 'center',
  },
  userAvatar: {
    marginRight: '10px',
  },
  avatar: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
  },
  userName: {
    margin: 0,
    fontWeight: 'bold',
    fontSize: '14px',
  },
  lastMessage: {
    margin: 0,
    color: '#888',
    fontSize: '8px',
  },
  time: {
    marginLeft: 'auto',
    fontSize: '8px',
    color: '#aaa',
    width: 'auto',
    textAlign: 'right',
  },
  notificationBadge: {
    backgroundColor: 'red',
    color: '#fff',
    borderRadius: '50%',
    padding: '5px 10px',
    fontSize: '12px',
    marginLeft: '10px',
  },
};

export default UserList;
