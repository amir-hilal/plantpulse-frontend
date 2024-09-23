import { useCallback, useEffect, useRef, useState } from 'react';
import { IoIosSend } from 'react-icons/io';
import Loading from 'react-loading';
import api from '../../services/api';
import echo from '../../services/echo';

const fetchMessages = (
  selectedUser,
  setMessages,
  setLoading,
  setHasMore,
  updateLastMessage,
  scrollToBottom,
  loading
) => {
  if (!selectedUser || loading) return;

  setLoading(true);
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
      setLoading(false);
      scrollToBottom();
    })
    .catch((error) => {
      console.error('Error fetching messages:', error);
      setLoading(false);
    });
};

const ChatWindow = ({ selectedUser, onFirstChat, updateLastMessage }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);
  const scrollPositionRef = useRef(0);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const maintainScrollPosition = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop =
        containerRef.current.scrollHeight - scrollPositionRef.current + 40;
    }
  }, []);

  useEffect(() => {
    setMessages([]);
    setPage(1);
    setHasMore(true);
  }, [selectedUser]);

  useEffect(() => {
    if (!selectedUser) return;

    const fetchInitialMessages = async () => {
      if (!loading) {
        fetchMessages(
          selectedUser,
          setMessages,
          setLoading,
          setHasMore,
          updateLastMessage,
          scrollToBottom,
          loading
        );
      }
    };

    fetchInitialMessages();

    const setupRealTimeListener = () => {
      const channel = echo.private(`chat.${selectedUser.id}`);

      channel.listen('MessageSent', (e) => {
        setMessages((prevMessages) => {
          if (!prevMessages.some((msg) => msg.id === e.message.id)) {
            return [...prevMessages, e.message];
          }
          return prevMessages;
        });
        updateLastMessage(selectedUser.id, e.message);
        scrollToBottom();
      });

      return () => {
        echo.leave(`chat.${selectedUser.id}`);
      };
    };

    const cleanupListener = setupRealTimeListener();

    return () => {
      cleanupListener();
    };
  }, [selectedUser?.id]);

  const loadMoreMessages = useCallback(() => {
    if (hasMore && !loadingMore) {
      scrollPositionRef.current =
        containerRef.current.scrollHeight - containerRef.current.scrollTop+500;
      setLoadingMore(true);
      api
        .get(`/chats/${selectedUser.id}?page=${page}`)
        .then((response) => {
          const newMessages = response.data.data.reverse();
          setMessages((prevMessages) => [...newMessages, ...prevMessages]);
          setHasMore(response.data.next_page_url !== null);
          setPage((prevPage) => prevPage + 1);
          setLoadingMore(false);
          maintainScrollPosition();
        })
        .catch((error) => {
          console.error('Error fetching more messages:', error);
          setLoadingMore(false);
        });
    }
  }, [hasMore, loadingMore, page, selectedUser.id, maintainScrollPosition]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    api
      .post('/chats/send', {
        receiver_id: selectedUser.id,
        message: newMessage,
      })
      .then((response) => {
        setMessages((prevMessages) => [...prevMessages, response.data]);
        updateLastMessage(selectedUser.id, response.data.message);
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
          if (e.target.scrollTop === 0 && hasMore && !loadingMore) {
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
        {loadingMore && (
          <div style={styles.loadingMoreIndicator}>
            {/* New loading indicator for more messages */}
            <Loading type="spin" color="#019444" height={30} width={30} />
          </div>
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

        <div ref={messagesEndRef} />
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
  loadingMoreIndicator: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '10px',
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
