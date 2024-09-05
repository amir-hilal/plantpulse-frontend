import React, { useCallback, useEffect, useState } from 'react';
import Loading from 'react-loading';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import CommentCard from '../components/common/CommentCard';
import {
  addComment,
  clearComments,
  fetchComments,
} from '../features/community/commentsSlice';
import api from '../services/api';

const PostDetailsPage = () => {
  const { id } = useParams(); // Get the post ID from the URL
  const dispatch = useDispatch();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState(''); // State to hold the new comment input
  const [commentSubmitting, setCommentSubmitting] = useState(false); // State to track comment submission
  const user = useSelector((state) => state.auth.userProfile);

  const comments = useSelector((state) => state.comments.comments);
  const commentLoading = useSelector((state) => state.comments.loading);
  const noMoreComments = useSelector((state) => state.comments.noMoreComments);
  const page = useSelector((state) => state.comments.page);

  useEffect(() => {
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


    // Clear comments before fetching new ones
    dispatch(clearComments());
    fetchPostDetails();
    dispatch(fetchComments({ postId: id, page: 1 }));
  }, [id, dispatch]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      commentLoading ||
      noMoreComments
    )
      return;

    dispatch(fetchComments({ postId: id, page: page + 1 }));
  }, [dispatch, id, page, commentLoading, noMoreComments]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Function to handle comment submission
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setCommentSubmitting(true);

    try {
      await dispatch(addComment({ postId: id, comment_text: newComment }));

      // Clear the input after successful comment
      setNewComment('');
      toast.success('Comment added successfully');
    } catch (error) {
      toast.error('Failed to add comment');
    } finally {
      setCommentSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-content-center align-items-center h-screen">
        <Loading type="spin" color="#019444" height={30} width={30} />
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
            <img
              src={post.image_url}
              alt="post"
              className="w-full border-round"
            />
          )}

          <p className="text-lg font-bold text-secondary my-2">{post.title}</p>

          <p className="text-base text-secondary my-2">{post.content}</p>
        </div>
      </div>

      {/* Comments Section */}
      <div className="w-12 md:w-6 ml-0 md:ml-2">
        <h3 className="mb-3 text-lg">Comments</h3>

        {/* Comment Input */}
        <div className="flex align-items-center mb-3">
          <img
            src={user.profile_photo_url}
            alt="Profile"
            className="w-3rem h-3rem border-circle mr-3"
          />
          <form className="flex-1 flex relative" onSubmit={handleCommentSubmit}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Leave a comment..."
              className="text-xs md:text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
              disabled={commentSubmitting}
              rows={1}
              style={{ resize: 'none', overflow: 'hidden' }}
              onInput={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
            />

            <button
              type="submit"
              className="bg-primary text-white border-round w-2rem p-1 px-2 pb-2 absolute right-0 m-1 hover:bg-primary-reverse border-none"
              disabled={commentSubmitting}
            >
              {commentSubmitting ? (
                <Loading type="spin" color="#ffffff" height={20} width={20} />
              ) : (
                <span>&#x2193;</span>
              )}
            </button>
          </form>
        </div>

        {/* Display Comments */}
        {comments.length > 0 ? (
          comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))
        ) : (
          <p>No comments yet.</p>
        )}
        {commentLoading && (
          <div className="flex justify-content-center align-items-center my-4">
            <Loading type="spin" color="#019444" height={30} width={30} />
          </div>
        )}
        {noMoreComments && comments.length !== 0 && (
          <p className="text-center">No more comments</p>
        )}
      </div>
    </div>
  );
};

export default PostDetailsPage;
