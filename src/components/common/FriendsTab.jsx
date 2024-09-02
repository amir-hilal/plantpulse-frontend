import React, { useState } from 'react';
import { FaUsers } from 'react-icons/fa';

const FriendsTab = ({ friends }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full">
      <div className="flex align-items-center justify-content-between mb-3">
        {/* Search Bar */}
        <div className="p-input-icon-left w-7 relative">
          <i className=" absolute pi pi-search ml-2 mt-2 text-grey text-sm"></i>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search for your friends"
            className="w-full p-2 pl-5 bg-tint-5 border-solid surface-border border-round appearance-none outline-none focus:border-primary "
          />
        </div>

        {/* Find New Friends Button */}
        <button className="bg-primary border-round border-solid border-primary hover:bg-primary-reverse py-2  flex align-items-center justify-content-center cursor-pointer ml-1 md:ml-0">
          <FaUsers className="mr-2" />
          Find New Friends
        </button>
      </div>

      {/* Friends List */}
      <div>
        {filteredFriends.length > 0 ? (
          filteredFriends.map((friend) => (
            <div
              key={friend.id}
              className="flex align-items-center border-round p-3 shadow-1 mb-2 bg-white"
            >
              <img
                src={friend.profilePhoto}
                alt={friend.name}
                className="h-3rem w-3rem border-circle mr-3"
              />
              <div className="flex-1">
                <h3 className="m-0 text-primary">{friend.name}</h3>
                <p className="m-0 text-secondary">{friend.username}</p>
              </div>
              <button className="bg-tint-5 text-primary border-round p-2 cursor-pointer">
                Send Message
              </button>
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
