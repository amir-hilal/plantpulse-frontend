import React, { useState } from 'react';
import { FaCommentDots } from 'react-icons/fa'; // Icon for the button

const FloatingChatButton = ({ onClick }) => {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        className="bg-orange-500 text-white p-4 rounded-full shadow-lg hover:bg-orange-600 transition duration-300"
        onClick={onClick}
      >
        <FaCommentDots size={24} />
      </button>
    </div>
  );
};

export default FloatingChatButton;
