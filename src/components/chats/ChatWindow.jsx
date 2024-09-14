import React, { useEffect, useState } from 'react';
import Loading from 'react-loading';
import api from '../../services/api';
import echo from '../../services/echo';

const ChatWindow = ({ selectedUser, onFirstChat, updateLastMessage }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMessages([]);
    setLoading(true); // Start loading
    api
      .get(`/chats/${selectedUser.id}`)
      .then((response) => {
        setMessages(response.data);
        setLoading(false); // Stop loading after messages are fetched
      })
      .catch((error) => {
        console.error('Error fetching messages:', error);
        setLoading(false); // Stop loading on error
      });

    const channel = echo.private(`chat.${selectedUser.id}`);
    channel.listen('MessageSent', (e) => {
      setMessages((prevMessages) => [...prevMessages, e.message]);
      updateLastMessage(selectedUser.id, e.message); // Update last message on receive
    });

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
        setMessages((prevMessages) => [...prevMessages, response.data]);
        updateLastMessage(selectedUser.id, response.data); // Update last message on send
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
                  ? styles.receivedMessage
                  : styles.sentMessage
              }
            >
              {msg.message}
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
