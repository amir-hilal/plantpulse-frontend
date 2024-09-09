import React from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '../../assets/svg/Icons/delete.svg';

const CommentCard = ({ comment, handleDelete,userId }) => {
  const navigate = useNavigate();

  const navigateToProfile = () => {
    navigate(`/profile/${comment.user.username}`);
  };

  return (
    <div className="flex align-items-start mb-3">
      <img
        src={comment.user.profile_photo_url}
        alt={comment.user.username}
        className="w-3rem h-3rem border-circle mr-2"
      />
      <div className="surface-100 p-3 border-round-lg flex-1">
        <p className="m-0 text-md font-medium">
          {/* User's first and last name are clickable */}
          <span className="cursor-pointer" onClick={navigateToProfile}>
            {comment.user.first_name} {comment.user.last_name}
          </span>{' '}
          &#x2022;{' '}
          <span className="text-secondary font-8">
            {new Date(comment.created_at).toLocaleTimeString()} |{' '}
            {new Date(comment.created_at).toLocaleDateString()}
          </span>
        </p>
        <p className="text-sm">{comment.comment_text}</p>
      </div>

      {/* Delete Button */}
      {comment.user_id === userId && (
        <button
          className="p-ml-auto p-2 cursor-pointer bg-transparent border-none"
          onClick={() => handleDelete(comment.id)}
        >
          <img src={DeleteIcon} alt="Delete" className="w-2rem h-2rem" />
        </button>
      )}
    </div>
  );
};

export default CommentCard;
