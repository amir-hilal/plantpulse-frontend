import React from 'react';

const UserList = ({ users, onUserSelect, searchTerm, setSearchTerm }) => {
  // Sort friends based on whether they have been chatted with
  const chattedFriends = users.filter((user) => user.hasChatted);
  const notChattedFriends = users.filter((user) => !user.hasChatted);

  return (
    <div>
      <h3 className="m-0" style={styles.header}>
        Chats
      </h3>
      {/* Search bar */}

      <div className="px-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for friends..."
          className="py-2 pl-6 w-full surface-100 border-solid surface-border border-round appearance-none outline-none focus:border-primary"
        />
      </div>

      <ul style={styles.list}>
        {chattedFriends.length > 0 ? (
          chattedFriends.map((user) => (
            <li
              key={user.id}
              style={styles.listItem}
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
                <p style={styles.lastMessage}>Last message here...</p>
              </div>
              <span style={styles.time}>10 min</span>
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
        {notChattedFriends.length > 0 ? (
          notChattedFriends.map((user) => (
            <li
              key={user.id}
              style={styles.listItem}
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
              <span style={styles.time}>No chat history</span>
            </li>
          ))
        ) : (
          <p className="px-2 mb-0 mt-4 text-light-grey text-xs">No other friends found.</p>
        )}
      </ul>
    </div>
  );
};

const styles = {
  header: {
    padding: '10px',
    backgroundColor: '#ffff',
    textAlign: 'center',
  },

  list: {
    listStyleType: 'none',
    padding: 0,
  },
  sectionHeader: {
    fontSize: '14px',
    fontWeight: 'normal',
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
};

export default UserList;
