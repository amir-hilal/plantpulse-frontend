import React, { useState } from 'react';
import { FaEllipsisH } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const PostCard = ({ post }) => {
  const [showPopover, setShowPopover] = useState(false);
  const navigate = useNavigate();

  const togglePopover = () => {
    setShowPopover(!showPopover);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`/community/posts/${post.id}`);
    toast.success('Post link copied to clipboard!');
    setShowPopover(false);
  };

  const handleViewPost = () => {
    navigate(`/community/posts/${post.id}`);
  };

  return (
    <div className=" border-bottom-1 border-400 p-3  mb-4 bg-white relative flex flex-column">
      {/* Post Header */}
      <div className="flex justify-content-between align-items-center mb-3">
        <div className="flex align-items-center">
          <img
            src={post.author_profile_photo_url}
            alt={post.author_name}
            className="w-3rem h-3rem border-circle mr-3"
          />
          <div>
            <h4 className="m-0">{post.author_name}</h4>
            <small className="text-secondary">
              {new Date(post.created_at).toLocaleTimeString()} | {new Date(post.created_at).toLocaleDateString()}
            </small>
          </div>
        </div>
        <div className="relative">
          <FaEllipsisH
            className="text-grey cursor-pointer"
            onClick={togglePopover}
          />
          {showPopover && (
            <div className="absolute right-0 mt-2 bg-tint-5  border-round shadow-2 p-2 z-50 w-8rem">
              <button
                className="text-sm p-2 border-none bg-transparent cursor-pointer hover:bg-light-grey text-center"
                onClick={handleCopyLink}
              >
                Copy Post Link
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Post Image */}
      {post.image_url && (
        <img
          src={post.image_url}
          alt="Post"
          className="w-full h-30rem mb-3 border-round"
        />
      )}

      {/* Post Content */}
      <p className="text-sm text-secondary">
        {post.content.length > 150 ? `${post.content.slice(0, 150)}...` : post.content}
      </p>

      {/* View Post Button */}
      <button
        className="bg-transparent border-none text-primary mt-2 cursor-pointer p-0 align-self-end"
        onClick={handleViewPost}
      >
        <u>View Post</u>
      </button>
    </div>
  );
};

export default PostCard;
