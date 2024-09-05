import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments, clearComments } from '../features/community/commentsSlice';
import api from '../services/api';
import CommentCard from '../components/common/CommentCard';
import Loading from 'react-loading';

const PostDetailsPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const comments = useSelector((state) => state.comments?.comments);
  const commentsLoading = useSelector((state) => state.comments.loading);
  const noMoreComments = useSelector((state) => state.comments.noMoreComments);
  const page = useSelector((state) => state.comments.page);

  // Fetch post details on mount
  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await api.get(`/posts/details/${id}`);
        setPost(response.data.post);
      } catch (error) {
        toast.error('Failed to load post');
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetails();
    dispatch(clearComments()); // Clear previous comments
    dispatch(fetchComments({ postId: id, page: 1 })); // Fetch initial comments
  }, [id, dispatch]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      commentsLoading ||
      noMoreComments
    )
      return;

    dispatch(fetchComments({ postId: id, page }));
  }, [dispatch, id, page, commentsLoading, noMoreComments]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

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
        {comments.length > 0 ? (
          comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))
        ) : (
          <p>No comments yet.</p>
        )}
        {commentsLoading && (
          <div className="flex justify-content-center my-4">
            <Loading type="spin" color="#019444" height={30} width={30} />
          </div>
        )}
        {noMoreComments && <p className="text-center">No more comments</p>}
      </div>
    </div>
  );
};

export default PostDetailsPage;
