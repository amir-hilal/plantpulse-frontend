import React from 'react';

const PostCard = ({ post }) => {
  return (
    <div className="border-round p-3 shadow-1 mb-4">
      {post.image_url && (
        <img
          src={post.image_url}
          alt="Post"
          className="w-full h-auto mb-3 border-round"
        />
      )}
      <h3 className="text-primary mb-2">{post.title}</h3>
      <p>{post.content}</p>
      <small className="text-grey">
        Posted on {new Date(post.created_at).toLocaleDateString()}
      </small>
    </div>
  );
};

export default PostCard;
