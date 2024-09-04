import { debounce } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import Loading from 'react-loading';
import { useDispatch, useSelector } from 'react-redux';
import UserCard from '../components/common/UserCard';
import {
  clearUsers,
  fetchUsers,
  searchUsers,
} from '../features/users/usersSlice';

const ConnectPage = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const loading = useSelector((state) => state.users.loading);
  const noMoreUsers = useSelector((state) => state.users.noMoreUsers);
  const nextPageUrl = useSelector((state) => state.users.nextPageUrl);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!searchQuery) {
      dispatch(clearUsers());
      dispatch(fetchUsers({ page: 1 }));
    } else {
      const debouncedSearch = debounce(() => {
        dispatch(clearUsers());
        dispatch(searchUsers(searchQuery));
      }, 1000);
      debouncedSearch();

      return () => {
        debouncedSearch.cancel();
      };
    }
  }, [dispatch, searchQuery]);

  const handleScroll = useCallback(() => {
    const scrollOffset = 200;

    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - scrollOffset &&
      !loading &&
      !noMoreUsers &&
      nextPageUrl
    ) {
      const nextPage = Math.ceil(users.length / 20) + 1;
      dispatch(fetchUsers({ page: nextPage }));
    }
  }, [dispatch, users.length, loading, noMoreUsers, nextPageUrl]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="flex flex-column align-items-center">
      <div className="p-input-icon-left col-7 relative">
        <i className="absolute pi pi-search ml-2 mt-2 text-grey text-sm"></i>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search for users"
          className="w-full p-2 pl-5 bg-tint-5 border-solid surface-border border-round appearance-none outline-none focus:border-primary"
        />
      </div>
      <div className="grid w-11 md:w-10">
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user.id} className="col-12 md:col-6">
              <UserCard user={user} />
            </div>
          ))
        ) : (
          <div>{(!loading && !users) && <p>No users found...</p>}</div>
        )}
      </div>
      {loading && (
        <div className="loading h-20rem flex align-items-center justify-content-center">
          <Loading type="spin" color="#019444" height={50} width={50} />
        </div>
      )}
      {noMoreUsers && <p className="text-center">No more users</p>}
    </div>
  );
};

export default ConnectPage;
