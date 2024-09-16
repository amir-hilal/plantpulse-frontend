import { useEffect, useRef, useState } from 'react';
import { IoIosSend } from 'react-icons/io';
import Loading from 'react-loading';
import api from '../../services/api';
import echo from '../../services/echo';

const ChatWindow = ({ selectedUser, onFirstChat, updateLastMessage }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);

  // Function to scroll to the bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Clear messages and reset state when switching between users
  useEffect(() => {
    setMessages([]); // Clear messages
    setPage(1); // Reset pagination
    setHasMore(true); // Reset 'hasMore' to true
  }, [selectedUser]);

  // Load older messages when scrolling up
  const loadMoreMessages = () => {
    if (hasMore && !loading) {
      setLoading(true);
      api
        .get(`/chats/${selectedUser.id}?page=${page + 1}`)
        .then((response) => {
          const newMessages = response.data.data.reverse();
          setMessages((prevMessages) => [...newMessages, ...prevMessages]);
          setHasMore(response.data.next_page_url !== null);
          setPage((prevPage) => prevPage + 1);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching more messages:', error);
          setLoading(false);
        });
    }
  };

  // useEffect to fetch messages and listen for real-time updates
  useEffect(() => {
    const fetchMessages = () => {
      setLoading(true); // Indicate loading
      api
        .get(`/chats/${selectedUser.id}?page=1`)
        .then((response) => {
          const fetchedMessages = response.data.data.reverse();
          setMessages(fetchedMessages);
          setHasMore(response.data.next_page_url !== null);
          if (fetchedMessages.length > 0) {
            updateLastMessage(
              selectedUser.id,
              fetchedMessages[fetchedMessages.length - 1]
            );
          }
          setLoading(false); // Stop loading
          setTimeout(scrollToBottom, 100);
        })
        .catch((error) => {
          console.error('Error fetching messages:', error);
          setLoading(false); // Stop loading
        });
    };

    const setupRealTimeListener = () => {
      const channel = echo.private(`chat.${selectedUser.id}`);
      channel.listen('MessageSent', (e) => {
        setMessages((prevMessages) => [...prevMessages, e.message]);
        updateLastMessage(selectedUser.id, e.message);
        scrollToBottom();
      });

      return () => {
        echo.leave(`chat.${selectedUser.id}`);
      };
    };

    // Fetch initial messages and set up real-time listener
    fetchMessages();
    const cleanupListener = setupRealTimeListener();

    return () => {
      cleanupListener(); // Clean up real-time listener
    };
  }, [selectedUser, updateLastMessage]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    api
      .post('/chats/send', {
        receiver_id: selectedUser.id,
        message: newMessage,
      })
      .then((response) => {
        setMessages((prevMessages) => [...prevMessages, response.data]);
        updateLastMessage(selectedUser.id, response.data);
        setNewMessage('');
        onFirstChat(selectedUser.id);
        scrollToBottom();
      })
      .catch((error) => {
        console.error('Error sending message:', error);
      });
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  return (
    <div style={styles.container}>
      <div style={styles.chatHeader}>
        <img
          src={
            selectedUser.profile_photo_url || 'https://via.placeholder.com/50'
          }
          alt={selectedUser.first_name}
          style={styles.profilePic}
        />
        <h3 style={styles.userName}>
          {selectedUser.first_name} {selectedUser.last_name}
        </h3>
      </div>
      <div
        style={styles.messageContainer}
        ref={containerRef}
        onScroll={(e) => {
          if (e.target.scrollTop === 0 && hasMore && !loading) {
            loadMoreMessages(); // Load older messages when scrolling to the top
          }
        }}
      >
        {loading && (
          <div style={styles.loadingIndicator}>
            <Loading type="spin" color="#019444" height={50} width={50} />
          </div>
        )}
        {!loading && messages.length === 0 && (
          <div style={styles.noMessages}>No messages to display.</div>
        )}
        {messages.map((msg, index) => (
          <div
            key={index}
            style={
              msg.sender_id === selectedUser.id
                ? styles.receivedMessageContainer
                : styles.sentMessageContainer
            }
          >
            <div
              style={
                msg.sender_id === selectedUser.id
                  ? styles.receivedMessage
                  : styles.sentMessage
              }
            >
              {msg.message}
              <div style={styles.timestamp}>
                {formatTimestamp(msg.created_at)}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} /> {/* Scroll to this div */}
      </div>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          style={styles.input}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSendMessage();
          }}
        />
        <button
          onClick={handleSendMessage}
          style={styles.sendButton}
          disabled={!newMessage}
        >
          <IoIosSend />
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  chatHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    backgroundColor: '#ffff',
  },
  profilePic: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    marginRight: '10px',
  },
  userName: {
    margin: 0,
    fontSize: '18px',
    fontWeight: 'bold',
  },
  messageContainer: {
    flex: 1,
    padding: '10px',
    overflowY: 'scroll',
    position: 'relative',
  },
  loadingIndicator: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  noMessages: {
    textAlign: 'center',
    marginTop: '20px',
    color: '#777',
  },
  receivedMessageContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginBottom: '5px',
  },
  sentMessageContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '10px',
  },
  receivedMessage: {
    backgroundColor: '#237D31',
    padding: '10px',
    color: '#fff',
    borderRadius: '15px 15px 15px 2px',
    margin: '5px 0',
    maxWidth: '60%',
    alignSelf: 'flex-start',
  },
  sentMessage: {
    backgroundColor: '#f3fbfb',
    color: '#263238',
    padding: '10px',
    borderRadius: '15px 15px 2px 15px',
    margin: '5px 0',
    maxWidth: '60%',
    alignSelf: 'flex-end',
  },
  timestamp: {
    fontSize: '10px',
    color: '#999',
    marginTop: '5px',
    textAlign: 'right',
  },
  inputContainer: {
    display: 'flex',
    padding: '10px',
  },
  input: {
    flex: 1,
    padding: '10px',
    borderRadius: '18px',
    border: '1px solid #ccc',
    marginRight: '10px',
  },
  sendButton: {
    padding: '10px',
    backgroundColor: '#263238',
    color: '#fff',
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
  },
};

export default ChatWindow;
