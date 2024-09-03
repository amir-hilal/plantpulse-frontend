import React, { useCallback, useEffect, useState } from 'react';
import Loading from 'react-loading';
import api from '../services/api';

const ConnectPage = () => {
  const [friends, setFriends] = useState([]);
  const [nonFriends, setNonFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPageUrlFriends, setNextPageUrlFriends] = useState(null);
  const [nextPageUrlNonFriends, setNextPageUrlNonFriends] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchUsers = useCallback(
    async (url, isFriend = true) => {
      try {
        const response = await api.get(url, {
          params: { search: searchQuery },
        });
        if (isFriend) {
          setFriends((prev) => [...prev, ...response.data.friends]);
          setNextPageUrlFriends(response.data.nextPageUrlFriends);
        } else {
          setNonFriends((prev) => [...prev, ...response.data.nonFriends]);
          setNextPageUrlNonFriends(response.data.nextPageUrlNonFriends);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [searchQuery] // Add searchQuery as a dependency
  );

  useEffect(() => {
    const initialUrl = '/users';
    fetchUsers(initialUrl, true);  // Fetch friends first
    fetchUsers(initialUrl, false); // Fetch non-friends next
  }, [fetchUsers]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      loading
    )
      return;

    if (nextPageUrlFriends) fetchUsers(nextPageUrlFriends, true);
    if (nextPageUrlNonFriends) fetchUsers(nextPageUrlNonFriends, false);
  }, [fetchUsers, loading, nextPageUrlFriends, nextPageUrlNonFriends]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="connect-page">
      <div className="search-bar flex justify-content-between mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search users..."
          className="w-full p-2 bg-tint-5 border-round"
        />
      </div>

      <div className="users-grid grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        {friends.map((user) => (
          <div key={user.id} className="user-card border-round shadow-1 p-3">
            <img
              src={user.profile_photo_url}
              alt={user.username}
              className="h-5rem w-5rem border-circle"
            />
            <div className="user-info ml-3">
              <h3 className="m-0">{user.name}</h3>
              <p className="m-0 text-secondary">{user.username}</p>
              <button className="bg-tint-5 text-primary border-round p-2 cursor-pointer mt-2">
                Send Message
              </button>
            </div>
          </div>
        ))}
        {nonFriends.map((user) => (
          <div key={user.id} className="user-card border-round shadow-1 p-3">
            <img
              src={user.profile_photo_url}
              alt={user.username}
              className="h-5rem w-5rem border-circle"
            />
            <div className="user-info ml-3">
              <h3 className="m-0">{user.name}</h3>
              <p className="m-0 text-secondary">{user.username}</p>
              <button className="bg-tint-5 text-primary border-round p-2 cursor-pointer mt-2">
                Send Message
              </button>
            </div>
          </div>
        ))}
      </div>

      {loading && (
        <div className="flex justify-content-center align-items-center my-4">
          <Loading type="spin" color="#019444" height={30} width={30} />
        </div>
      )}
    </div>
  );
};

export default ConnectPage;
