import React, { useEffect, useState } from 'react';
import Loading from 'react-loading';
import { useDispatch, useSelector } from 'react-redux';
import ChatWindow from '../components/chats/ChatWindow';
import UserList from '../components/chats/UserList';
import { moveUserToChatted } from '../features/chat/chatSlice';
import { fetchFriendsByUsername } from '../features/community/friendsSlice';
import api from '../services/api';
import echo from '../services/echo';

const ChatsPage = () => {
  const dispatch = useDispatch();
  const friends = useSelector((state) => state.friends.friends);
  const chattedFriends = useSelector((state) => state.chat.chattedFriends);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const user = useSelector((state) => state.auth.userProfile);
  const userLoading = useSelector((state) => state.auth.loading);
  const lastMessages = useSelector((state) => state.chat.lastMessages); // Get last messages from Redux
  const [loading, setLoading] = useState(true);
  const [unreadMessages, setUnreadMessages] = useState({});

  useEffect(() => {
    if (user && user.username) {
      dispatch(fetchFriendsByUsername({ username: user.username }));
    }

    if (user) {
      setLoading(true);
      api
        .get('/chats/users/conversations')
        .then((response) => {
          const conversations = response.data;

          const chattedFriendsSet = new Set();
          const lastMessagesMap = {};

          conversations.forEach((conversation) => {
            // Extract the receiver based on who the current user is
            const receiver = conversation.receiver;

            // Add the entire receiver object (instead of just ID) to the Set
            chattedFriendsSet.add(receiver);

            if (conversation.last_message) {
              lastMessagesMap[receiver.id] = conversation.last_message;
            }
          });

          // Dispatch action to store chatted friends (receiver objects) in Redux
          dispatch(moveUserToChatted(Array.from(chattedFriendsSet)));
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching conversations:', error);
          setLoading(false);
        });
    }
  }, [dispatch, user]);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setUnreadMessages((prev) => ({ ...prev, [user.id]: 0 }));
  };

  // const updateLastMessage = (userId, message) => {
  //   setLastMessages((prev) => ({
  //     ...prev,
  //     [userId]: message,
  //   }));
  // };

  useEffect(() => {
    if (user && user.id) {
      const channel = echo.private(`chat.${user.id}`);

      channel.listen('MessageSent', (e) => {
        if (e.sender_id !== selectedUser?.id) {
          setUnreadMessages((prev) => ({
            ...prev,
            [e.sender_id]: (prev[e.sender_id] || 0) + 1,
          }));
        }
      });

      return () => {
        echo.leave(`chat.${user.id}`);
      };
    }
  }, [user?.id, selectedUser?.id]);

  // Filter friends into chatted and non-chatted
  const filteredFriends = friends.filter((friend) =>
    friend.first_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const otherFriends = filteredFriends.filter(
    (friend) => !chattedFriends.includes(friend.id)
  );

  const handleFirstChat = (user) => {
    dispatch(moveUserToChatted(user)); // Move user to chatted friends in Redux state
  };

  if (userLoading || loading) {
    return (
      <div style={styles.loadingContainer}>
        <Loading type="spin" color="#019444" height={50} width={50} />
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div className="w-4 md:w-3">
        <UserList
          users={filteredFriends}
          otherFriends={otherFriends}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onUserSelect={handleUserSelect}
          lastMessages={lastMessages}
          currentUserId={user?.id}
          chattedFriends={chattedFriends}
          selectedUserId={selectedUser?.id}
          unreadMessages={unreadMessages}
        />
      </div>
      <div className="w-8 md:w-9">
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
