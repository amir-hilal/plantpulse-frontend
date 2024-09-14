import React, { useEffect, useState } from 'react';
import api from '../../services/api'; // Import the custom API instance
import echo from '../../services/echo';

const ChatWindow = ({ selectedUser, onFirstChat }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    setMessages([]);
    api
      .get(`/chats/${selectedUser.id}`) // Use the custom API instance
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.error('Error fetching messages:', error); // Error handling is managed by the interceptor
      });

    // Set up real-time message listener
    const channel = echo.private(`chat.${selectedUser.id}`);
    channel.listen('MessageSent', (e) => {
      setMessages((prevMessages) => [...prevMessages, e.message]);
    });

    return () => {
      echo.leave(`chat.${selectedUser.id}`); // Leave the channel when the component is unmounted
    };
  }, [selectedUser]);

  const handleSendMessage = () => {
    api
      .post('/chats/send', {
        receiver_id: selectedUser.id,
        message: newMessage,
      })
      .then((response) => {
        setMessages((prevMessages) => [...prevMessages, response.data]);
        setNewMessage('');
        // Call the callback to notify the first chat
        onFirstChat(selectedUser.id);
      })
      .catch((error) => {
        console.error('Error sending message:', error);
      });
  };

  return (
    <div style={styles.container}>
      <div style={styles.chatHeader}>
        <h3>
          {selectedUser.first_name} {selectedUser.last_name}
        </h3>
      </div>
      <div style={styles.messageContainer}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={
              msg.sender_id === selectedUser.id
                ? styles.receivedMessage
                : styles.sentMessage
            }
          >
            {msg.message}
          </div>
        ))}
      </div>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          style={styles.input}
        />
        <button onClick={handleSendMessage} style={styles.sendButton}>
          Send
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
    padding: '10px',
    backgroundColor: '#f4f4f4',
    borderBottom: '1px solid #ccc',
  },
  messageContainer: {
    flex: 1,
    padding: '10px',
    overflowY: 'scroll',
  },
  receivedMessage: {
    backgroundColor: '#eee',
    padding: '10px',
    borderRadius: '15px',
    margin: '5px 0',
    maxWidth: '60%',
    alignSelf: 'flex-start',
  },
  sentMessage: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px',
    borderRadius: '15px',
    margin: '5px 0',
    maxWidth: '60%',
    alignSelf: 'flex-end',
  },
  inputContainer: {
    display: 'flex',
    padding: '10px',
    borderTop: '1px solid #ccc',
  },
  input: {
    flex: 1,
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginRight: '10px',
  },
  sendButton: {
    padding: '10px 15px',
    backgroundColor: '#007bff',
    color: '#fff',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
  },
};

export default ChatWindow;
