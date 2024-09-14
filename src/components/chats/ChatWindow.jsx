import dayjs from 'dayjs'; // Assuming you are using dayjs for formatting timestamps
import React, { useEffect, useState } from 'react';
import { IoIosSend } from 'react-icons/io';
import Loading from 'react-loading';
import api from '../../services/api';
import echo from '../../services/echo';

const ChatWindow = ({ selectedUser, onFirstChat, updateLastMessage }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Refetch messages only when selected user changes
    setMessages([]);
    setLoading(true);

    api
      .get(`/chats/${selectedUser.id}`)
      .then((response) => {
        setMessages(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching messages:', error);
        setLoading(false);
      });

    // Set up echo listener for real-time messages
    const channel = echo.private(`chat.${selectedUser.id}`);
    channel.listen('MessageSent', (e) => {
      setMessages((prevMessages) => [...prevMessages, e.message]);
      updateLastMessage(selectedUser.id, e.message); // Update last message on receive
    });

    // Cleanup on component unmount or user change
    return () => {
      echo.leave(`chat.${selectedUser.id}`);
    };
  }, [selectedUser, updateLastMessage]);

  const handleSendMessage = () => {
    api
      .post('/chats/send', {
        receiver_id: selectedUser.id,
        message: newMessage,
      })
      .then((response) => {
        // Append the new message to the current messages without refetching
        setMessages((prevMessages) => [...prevMessages, response.data]);
        updateLastMessage(selectedUser.id, response.data); // Update last message on send
        setNewMessage(''); // Clear input field
        onFirstChat(selectedUser.id); // Notify the first chat
      })
      .catch((error) => {
        console.error('Error sending message:', error);
      });
  };

  const formatTimestamp = (timestamp) => {
    return dayjs(timestamp).format('h:mm A'); // You can adjust the format to your needs
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
      <div style={styles.messageContainer}>
        {loading ? (
          <div className="flex justify-content-center w-full h-30rem align-items-center">
            <Loading type="spin" color="#019444" height={50} width={50} />
          </div>
        ) : (
          messages.map((msg, index) => (
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
          ))
        )}
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
