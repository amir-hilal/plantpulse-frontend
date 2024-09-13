import React, { useState } from 'react';
import { FaEllipsisH } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deletePost } from '../../features/community/postsSlice';
import ConfirmationModal from '../common/ConfirmationModal';

const PostCard = ({ post }) => {
  const [showPopover, setShowPopover] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.userProfile);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const dispatch = useDispatch();

  const isOwner = post.author_username === user.username;
  const togglePopover = () => {
    setShowPopover(!showPopover);
  };
  const handleNavigateToProfile = () => {
    navigate(`/profile/${post.author_username}`);
  };
  const handleCopyLink = () => {
    const fullUrl = `${window.location.origin}/community/posts/${post.id}`;
    navigator.clipboard.writeText(fullUrl);
    toast.success('Post link copied to clipboard!');
    setShowPopover(false);
  };

  const handleViewPost = () => {
    navigate(`/community/posts/${post.id}`);
  };

  const handleDelete = (post) => {
    setItemToDelete(post);
    setIsModalOpen(true); 
  };

  const handleConfirmDelete = () => {
    dispatch(deletePost(itemToDelete.id));

    setIsModalOpen(false);
    setItemToDelete(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setItemToDelete(null);
  };

  return (
    <div className=" border-bottom-1 border-400 mb-4 bg-white relative flex flex-column">
      {/* Post Header */}
      <div className="flex justify-content-between align-items-center mb-3 ">
        <div
          onClick={handleNavigateToProfile}
          className="flex align-items-center cursor-pointer"
        >
          <img
            src={post.author_profile_photo_url}
            alt={post.author_name}
            className="w-3rem h-3rem border-circle mr-3"
          />
          <div>
            <h4 className="m-0">{post.author_name}</h4>
            <small className="text-secondary">
              {new Date(post.created_at).toLocaleTimeString()} |{' '}
              {new Date(post.created_at).toLocaleDateString()}
            </small>
          </div>
        </div>
        <div className="relative">
          <FaEllipsisH
            className="text-grey cursor-pointer"
            onClick={togglePopover}
          />
          {showPopover && (
            <div className="absolute right-0 mt-2 surface-100  border-round shadow-2 p-2  w-8rem">
              <button
                className="text-sm p-2 border-none bg-transparent cursor-pointer hover:bg-primary-reverse text-left"
                onClick={handleCopyLink}
              >
                Copy Post Link
              </button>
              {isOwner && (
                <button
                  className="text-sm p-2 border-none bg-transparent cursor-pointer hover:bg-primary-reverse"
                  onClick={() => handleDelete(post)}
                >
                  Delete
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      {/* Post Content */}
      <p className="text-sm text-secondary">
        {post.content.length > 150
          ? `${post.content.slice(0, 150)}...`
          : post.content}
      </p>

      {/* View Post Button */}

      {/* Post Image */}
      {post.image_url && (
        <img
          src={post.image_url}
          alt="Post"
          className="w-full max-h-30rem mb-3 border-round"
        />
      )}
      <button
        className="bg-transparent border-none text-primary mt-2 cursor-pointer p-0 align-self-end mb-2"
        onClick={handleViewPost}
      >
        <u>View Post</u>
      </button>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        message={`Are you sure you want to delete?`}
      />
    </div>
  );
};

export default PostCard;
