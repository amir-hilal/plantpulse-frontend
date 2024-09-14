import dayjs from 'dayjs'; // Assuming you are using dayjs for formatting timestamps
import React, { useEffect, useRef, useState } from 'react';
import { IoIosSend } from 'react-icons/io';
import Loading from 'react-loading';
import api from '../../services/api';
import echo from '../../services/echo';

const ChatWindow = ({ selectedUser, onFirstChat, updateLastMessage }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // To handle pagination
  const [hasMore, setHasMore] = useState(true); // Track if more messages are available
  const messagesEndRef = useRef(null); // To auto-scroll to the bottom
  const containerRef = useRef(null); // To detect scroll position for loading more

  // Function to scroll to the bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Load older messages when scrolling up
  const loadMoreMessages = () => {
    if (hasMore && !loading) {
      setLoading(true);
      api
        .get(`/chats/${selectedUser.id}?page=${page + 1}`)
        .then((response) => {
          const newMessages = response.data.data.reverse(); // Reverse the messages to show newest at the bottom
          setMessages((prevMessages) => [...newMessages, ...prevMessages]);
          setHasMore(response.data.next_page_url !== null); // Check if more pages are available
          setPage((prevPage) => prevPage + 1);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching more messages:', error);
          setLoading(false);
        });
    }
  };

  // Fetch initial messages and set up real-time messaging
  useEffect(() => {
    setMessages([]);
    setLoading(true);
    setPage(1); // Reset pagination to the first page
    setHasMore(true); // Reset pagination state

    // Fetch the initial messages
    api
      .get(`/chats/${selectedUser.id}?page=1`)
      .then((response) => {
        setMessages(response.data.data.reverse()); // Reverse the messages to show newest at the bottom
        setHasMore(response.data.next_page_url !== null); // Check if more pages are available
        setLoading(false);
        // Scroll to the bottom after the messages have been loaded
        setTimeout(scrollToBottom, 100); // Delay to ensure all messages are rendered before scrolling
      })
      .catch((error) => {
        console.error('Error fetching messages:', error);
        setLoading(false);
      });

    // Set up echo listener for real-time messages
    const channel = echo.private(`chat.${selectedUser.id}`);
    channel.listen('MessageSent', (e) => {
      console.log('Message received:', e);
      setMessages((prevMessages) => [...prevMessages, e.message]);
      updateLastMessage(selectedUser.id, e.message); // Update last message on receive
      scrollToBottom(); // Scroll to the bottom on new message
    });

    return () => {
      echo.leave(`chat.${selectedUser.id}`); // Clean up channel listener on user change
    };
  }, [selectedUser, updateLastMessage]);

  // Send a new message
  const handleSendMessage = () => {
    api
      .post('/chats/send', {
        receiver_id: selectedUser.id,
        message: newMessage,
      })
      .then((response) => {
        setMessages((prevMessages) => [...prevMessages, response.data]); // Append new message
        updateLastMessage(selectedUser.id, response.data); // Update last message on send
        setNewMessage(''); // Clear input field
        onFirstChat(selectedUser.id); // Notify the first chat
        scrollToBottom(); // Scroll to the bottom after sending a message
      })
      .catch((error) => {
        console.error('Error sending message:', error);
      });
  };

  // Format timestamps for messages
  const formatTimestamp = (timestamp) => {
    return dayjs(timestamp).format('h:mm A');
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
        {loading && page > 1 && (
          <div style={styles.loadingIndicator}>
            <Loading type="spin" color="#019444" height={30} width={30} />
          </div>
        )}
        {/* Display messages */}
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
          className="appearance-none outline-none focus:border-primary"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSendMessage();
            }
          }}
        />

        <button
          onClick={handleSendMessage}
          style={styles.sendButton}
          disabled={!newMessage}
          className={`${
            !newMessage ? 'surface-700 cursor-auto' : ' cursor-pointer'
          }`}
        >
          <IoIosSend className="text-lg" />
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
    marginBottom: '10px', // Space between spinner and messages
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
    borderRadius: '15px 15px 15px 2px', // One-sided rounded corner (top-left, top-right, bottom-right)
    margin: '5px 0',
    maxWidth: '60%',
    alignSelf: 'flex-start',
  },
  sentMessage: {
    backgroundColor: '#f3fbfb',
    color: '#263238',
    padding: '10px',
    borderRadius: '15px 15px 2px 15px', // One-sided rounded corner (top-left, top-right, bottom-left)
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
