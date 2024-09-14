import React, { useEffect, useState } from 'react';
import Loading from 'react-loading';
import { useDispatch, useSelector } from 'react-redux';
import ChatWindow from '../components/chats/ChatWindow';
import UserList from '../components/chats/UserList';
import { fetchFriendsByUsername } from '../features/community/friendsSlice';
import api from '../services/api';

const ChatsPage = () => {
  const dispatch = useDispatch();
  const friends = useSelector((state) => state.friends.friends);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [chattedFriends, setChattedFriends] = useState([]);
  const user = useSelector((state) => state.auth.userProfile);
  const userLoading = useSelector((state) => state.auth.loading);
  const [lastMessages, setLastMessages] = useState({});

  useEffect(() => {
    if (user && user.username) {
      dispatch(fetchFriendsByUsername({ username: user.username }));
    }

    if (user) {
      api
        .get('/chats/users/conversations')
        .then((response) => {
          const conversations = response.data;


          const chattedFriendsMap = {};
          const lastMessagesMap = {};

          conversations.forEach((conversation) => {
            const friendId =
              conversation.user_one_id === user.id
                ? conversation.user_two_id
                : conversation.user_one_id;

            // Set the friend ID as chatted friend
            chattedFriendsMap[friendId] = true;

            // Add last message if available
            if (conversation.last_message) {
              lastMessagesMap[friendId] = conversation.last_message;
            }
          });

          // Update the chattedFriends array and lastMessages state
          setChattedFriends(Object.keys(chattedFriendsMap));
          setLastMessages(lastMessagesMap);

        })
        .catch((error) => {
          console.error('Error fetching conversations:', error);
        });
    }
  }, [dispatch, user]);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  // Filter friends based on the search term and determine if they have been chatted with
  const filteredFriends = friends
    .filter((friend) =>
      friend.first_name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .map((friend) => ({
      ...friend,
      hasChatted: chattedFriends.includes(friend.id),
    }));
  const handleFirstChat = (userId) => {
    if (!chattedFriends.includes(userId)) {
      setChattedFriends((prev) => [...prev, userId]);
    }
  };
  // Sorting the friends based on chatted status
  const sortedFriends = filteredFriends.sort((a, b) => {
    return a.hasChatted === b.hasChatted ? 0 : a.hasChatted ? -1 : 1;
  });

  if (userLoading) {
    return (
      <div style={styles.loadingContainer}>
        <Loading type="spin" color="#019444" height={50} width={50} />
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.userList}>
        <UserList
          users={sortedFriends}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onUserSelect={handleUserSelect}
          lastMessages={lastMessages}
          currentUserId={user?.id}
          chattedFriends={chattedFriends}
        />
      </div>
      <div style={styles.chatWindow}>
        {selectedUser ? (
          <ChatWindow
            selectedUser={selectedUser}
            onFirstChat={handleFirstChat}
          />
        ) : (
          <div style={styles.placeholder}>Select a user to start chatting</div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    height: '89vh',
    width: '100%',
  },
  userList: {
    width: '25%',
  },
  chatWindow: {
    width: '75%',
  },
  placeholder: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    fontSize: '20px',
    color: '#777',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontSize: '24px',
    color: '#555',
  },
};

export default ChatsPage;
