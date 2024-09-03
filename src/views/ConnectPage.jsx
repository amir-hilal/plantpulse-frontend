import React, { useEffect, useState, useCallback } from 'react';
import Loading from 'react-loading';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, searchUsers, clearUsers } from '../features/users/usersSlice';
import UserCard from '../components/common/UserCard';
import { debounce } from 'lodash';

const ConnectPage = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const loading = useSelector((state) => state.users.loading);
  const noMoreUsers = useSelector((state) => state.users.noMoreUsers);
  const nextPageUrlFriends = useSelector((state) => state.users.nextPageUrlFriends);
  const nextPageUrlNonFriends = useSelector((state) => state.users.nextPageUrlNonFriends);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!searchQuery) {
      dispatch(clearUsers());
      dispatch(fetchUsers({ page: 1 }));
    } else {
      const debouncedSearch = debounce(() => {
        dispatch(searchUsers(searchQuery));
      }, 1000);
      debouncedSearch();

      return () => {
        debouncedSearch.cancel();
      };
    }
  }, [dispatch, searchQuery]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      loading ||
      noMoreUsers
    )
      return;

    // Check if there are still more users to load
    if (nextPageUrlFriends || nextPageUrlNonFriends) {
      dispatch(fetchUsers({ page: users.length / 10 + 1 }));
    }
  }, [dispatch, users.length, loading, noMoreUsers, nextPageUrlFriends, nextPageUrlNonFriends]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="connect-page">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input bg-tint-5"
        />
        <button className="search-button bg-primary text-white">
          Search
        </button>
      </div>
      <div className="user-grid">
        {users.length > 0 ? (
          users.map((user) => <UserCard key={user.id} user={user} />)
        ) : (
          <p>No users found...</p>
        )}
      </div>
      {loading && (
        <div className="loading">
          <Loading type="spin" color="#019444" height={50} width={50} />
        </div>
      )}
      {noMoreUsers && <p className="text-center">No more users</p>}
    </div>
  );
};

export default ConnectPage;
