import React from 'react';

const UserList = ({ users, onUserSelect, searchTerm, setSearchTerm }) => {
  // Sort friends based on whether they have been chatted with
  const chattedFriends = users.filter((user) => user.hasChatted);
  const notChattedFriends = users.filter((user) => !user.hasChatted);

  return (
    <div>
      <h3 style={styles.header}>Chats</h3>
      {/* Search bar */}
      <input
        type="text"
        placeholder="Search for friends..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={styles.searchInput}
      />

      <ul style={styles.list}>
        <h4 style={styles.sectionHeader}>Chatted Friends</h4>
        {chattedFriends.length > 0 ? (
          chattedFriends.map((user) => (
            <li
              key={user.id}
              style={styles.listItem}
              onClick={() => onUserSelect(user)}
            >
              <div style={styles.userAvatar}>
                <img
                  src={user.profile_photo_url || 'https://via.placeholder.com/50'}
                  alt={user.first_name}
                  style={styles.avatar}
                />
              </div>
              <div>
                <h4 style={styles.userName}>{user.first_name} {user.last_name}</h4>
                <p style={styles.lastMessage}>Last message here...</p>
              </div>
              <span style={styles.time}>10 min</span>
            </li>
          ))
        ) : (
          <p>No chatted friends found.</p>
        )}

        <h4 style={styles.sectionHeader}>Other Friends</h4>
        {notChattedFriends.length > 0 ? (
          notChattedFriends.map((user) => (
            <li
              key={user.id}
              style={styles.listItem}
              onClick={() => onUserSelect(user)}
            >
              <div style={styles.userAvatar}>
                <img
                  src={user.profile_photo_url || 'https://via.placeholder.com/50'}
                  alt={user.first_name}
                  style={styles.avatar}
                />
              </div>
              <div>
                <h4 style={styles.userName}>{user.first_name} {user.last_name}</h4>
                <p style={styles.lastMessage}>Start a new chat...</p>
              </div>
              <span style={styles.time}>No chat history</span>
            </li>
          ))
        ) : (
          <p>No other friends found.</p>
        )}
      </ul>
    </div>
  );
};

const styles = {
  header: {
    padding: '10px',
    backgroundColor: '#f4f4f4',
    textAlign: 'center',
    borderBottom: '1px solid #ccc',
  },
  searchInput: {
    padding: '8px',
    width: '100%',
    boxSizing: 'border-box',
    border: '1px solid #ccc',
    marginBottom: '10px',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
  },
  sectionHeader: {
    padding: '10px',
    backgroundColor: '#eaeaea',
    textAlign: 'left',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#555',
  },
  listItem: {
    display: 'flex',
    padding: '10px',
    cursor: 'pointer',
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
  },
  lastMessage: {
    margin: 0,
    color: '#888',
  },
  time: {
    marginLeft: 'auto',
    fontSize: '12px',
    color: '#aaa',
  },
};

export default UserList;
