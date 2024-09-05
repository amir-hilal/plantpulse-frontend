import React from 'react';

const CommentCard = ({ comment }) => {
  return (
    <div className="flex align-items-start mb-3">
      <img
        src={comment.user.profile_photo_url}
        alt={comment.user.username}
        className="w-3rem h-3rem border-circle mr-2"
      />
      <div className="surface-100 p-3 border-round">
        <p className="m-0 text-md font-medium">
          {comment.user.first_name} {comment.user.last_name} &#x2022;{' '}
          <span className="text-secondary font-8">
            {new Date(comment.created_at).toLocaleTimeString()} |{' '}
            {new Date(comment.created_at).toLocaleDateString()}
          </span>
        </p>
        <p className="text-sm">{comment.comment_text}</p>
      </div>
    </div>
  );
};

export default CommentCard;
