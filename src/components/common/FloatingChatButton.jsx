import React from 'react';
import { FaCommentDots } from 'react-icons/fa'; // Icon for the button

const FloatingChatButton = ({ onClick }) => {
  return (
    <div className="fixed bottom-0 right-0 z-50 cursor-pointer mr-4 mb-4">
      <button
        className="bg-secondary border-round-3xl border-none hover:surface-900 text-white p-3 rounded-full shadow-lg  transition duration-300 flex align-items-center"
        onClick={onClick}
      >
        <p className='pr-3 m-0'>Ask Flora</p>
        <FaCommentDots size={18} />
      </button>
    </div>
  );
};

export default FloatingChatButton;
