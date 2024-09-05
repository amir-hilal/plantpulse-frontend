import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../services/api';

const PostDetailsPage = () => {
  const { id } = useParams(); // Get the post ID from the URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the post details by post ID
    const fetchPostDetails = async () => {
      try {
        const response = await api.get(`/posts/details/${id}`);
        setPost(response.data);
      } catch (error) {
        toast.error('Failed to load post');
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-content-center align-items-center h-screen">
        Loading...
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex justify-content-center align-items-center h-screen">
        Post not found
      </div>
    );
  }

  return (
    <div className="p-4 surface-0 border-round shadow-2 m-2 w-11 mx-auto flex flex-column md:flex-row">
      {/* Post */}
      <div className="flex flex-column w-12 md:w-6 mr-0 md:mr-2">
        {/* post header */}
        <div className="flex align-items-center mb-3">
          <img
            src={post.user.profile_photo_url}
            alt={post.user.username}
            className="w-3rem h-3rem border-circle mr-3"
          />
          <div>
            <h4 className="m-0">
              {post.user.first_name} {post.user.last_name}
            </h4>
            <small className="text-secondary">
              {new Date(post.created_at).toLocaleTimeString()} |{' '}
              {new Date(post.created_at).toLocaleDateString()}
            </small>
          </div>
        </div>
        <div className="mb-4">
          {post.image_url && (
            <img src={post.image_url} alt="post" className="w-full" />
          )}

          <p className="text-lg font-bold text-secondary my-2">{post.title}</p>

          <p className="text-base text-secondary my-2">{post.content}</p>
        </div>
      </div>

      {/* Comments Section */}

      <div className="w-12 md:w-6 ml-0 md:ml-2">
        <h3 className="mb-3 text-lg">Comments</h3>
        {post.comments.length > 0 ? (
          post.comments.map((comment) => (
            <div key={comment.id} className="flex align-items-start mb-3">
              <img
                src={comment.user.profile_photo_url}
                alt={comment.user.username}
                className="w-3rem h-3rem border-circle mr-2"
              />
              <div className="surface-100 p-3 border-round">
                <p className="m-0 text-md font-medium">
                  {comment.user.first_name} {comment.user.last_name} &#x2022;{' '}
                  <span className="text-secondary font-8">
                    {' '}
                    {new Date(post.created_at).toLocaleTimeString()} |{' '}
                    {new Date(post.created_at).toLocaleDateString()}
                  </span>
                </p>
                <p className="text-sm">{comment.comment_text}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default PostDetailsPage;
