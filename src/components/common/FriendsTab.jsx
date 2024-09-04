import React, { useState } from 'react';
import { FaUsers } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import UserCard from './UserCard';

const FriendsTab = ({ friends, onSearch, isOwner }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };
  const filteredFriends = friends.filter((friend) =>
    friend.first_name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="w-full">
      <div
        className={`flex align-items-center  mb-3 ${
          isOwner ? 'justify-content-between' : 'justify-content-center'
        }`}
      >
        {/* Search Bar */}
        <div className="p-input-icon-left col-7 relative">
          <i className=" absolute pi pi-search ml-2 mt-2 text-grey text-sm"></i>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search for friends"
            className="w-full p-2 pl-5 bg-tint-5 border-solid surface-border border-round appearance-none outline-none focus:border-primary z-1"
          />
        </div>

        {/* Find New Friends Button */}
        {isOwner && (
          <button
            onClick={() => navigate('/community/connect')}
            className="col-3 text-sm bg-primary border-round border-solid border-primary hover:bg-primary-reverse py-2  flex align-items-center justify-content-center cursor-pointer ml-1 md:ml-0"
          >
            <FaUsers className=" w-2rem mr-2 " />
            Connect
          </button>
        )}
      </div>

      {/* Friends List */}
      <div>
        {filteredFriends.length > 0 ? (
          filteredFriends.map((friend) => (
            <div
              key={friend.id}
            >
              <UserCard user={friend}></UserCard>
            </div>
          ))
        ) : (
          <div className="text-center text-secondary mt-4">
            No friends to show...
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendsTab;
