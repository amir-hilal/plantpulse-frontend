// src/views/ConnectPage.jsx

import { debounce } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { FaUsers } from 'react-icons/fa';
import Loading from 'react-loading';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearUsers,
  fetchUsers,
  searchUsers,
} from '../features/users/usersSlice';

const ConnectPage = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const users = useSelector((state) => state.users.users);
  const loading = useSelector((state) => state.users.loading);
  const noMoreUsers = useSelector((state) => state.users.noMoreUsers);

  // Debounced function to handle search
  const debouncedSearch = useCallback(
    debounce((query) => {
      if (query.trim()) {
        dispatch(clearUsers());
        dispatch(searchUsers(query));
      }
    }, 1000),
    [dispatch]
  ); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim()) {
      debouncedSearch(query);
    } else {
      dispatch(clearUsers());
      dispatch(fetchUsers({ page: 1 })); // Load initial users if search is cleared
    }
  };

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      loading ||
      noMoreUsers ||
      searchQuery.trim()
    )
      return;

    dispatch(fetchUsers({ page: users.length / 10 + 1 }));
  }, [dispatch, loading, noMoreUsers, searchQuery, users.length]);

  useEffect(() => {
    dispatch(fetchUsers({ page: 1 }));

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dispatch, handleScroll]);

  return (
    <div className="p-4">
      <div className="flex align-items-center justify-content-between mb-3">
        {/* Search Bar */}
        <div className="p-input-icon-left col-7 relative">
          <i className="absolute pi pi-search ml-2 mt-2 text-grey text-sm"></i>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search for users"
            className="w-full p-2 pl-5 bg-tint-5 border-solid surface-border border-round appearance-none outline-none focus:border-primary "
          />
        </div>

        {/* Find New Friends Button */}
        <button className="col-3 text-sm bg-primary border-round border-solid border-primary hover:bg-primary-reverse py-2  flex align-items-center justify-content-center cursor-pointer ml-1 md:ml-0">
          <FaUsers className="w-2rem mr-2" />
          Find New Friends
        </button>
      </div>

      {/* Users List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {users.length > 0
          ? users.map((user) => (
              <div
                key={user.id}
                className="flex align-items-center border-round p-3 shadow-1 mb-2 bg-white"
              >
                <img
                  src={user.profilePhoto}
                  alt={user.name}
                  className="h-3rem w-3rem border-circle mr-3"
                />
                <div className="flex-1">
                  <h3 className="m-0 text-primary">{user.name}</h3>
                  <p className="m-0 text-secondary">{user.username}</p>
                </div>
              </div>
            ))
          : !loading && (
              <div className="text-center text-secondary mt-4">
                No users to show...
              </div>
            )}
      </div>

      {/* Loading Indicator */}
      {loading && (
        <div className="flex justify-content-center align-items-center my-4">
          <Loading type="spin" color="#019444" height={30} width={30} />
        </div>
      )}

      {/* No More Users Indicator */}
      {noMoreUsers && !loading && (
        <div className="text-center mt-4 text-secondary">No more users</div>
      )}
    </div>
  );
};

export default ConnectPage;
