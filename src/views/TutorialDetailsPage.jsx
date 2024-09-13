import React, { useEffect, useState } from 'react';
import Loading from 'react-loading';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import CommentCard from '../components/common/CommentCard';
import {
  addComment,
  deleteComment,
  fetchComments,
  fetchTutorialById,
} from '../features/tutorials/tutorialsSlice';

// Helper function to extract video ID from YouTube URL
const extractVideoId = (url) => {
  const urlParams = new URLSearchParams(new URL(url).search);
  return urlParams.get('v');
};

const TutorialDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [newComment, setNewComment] = useState('');
  const [commentSubmitting, setCommentSubmitting] = useState(false);

  const { tutorials, comments, loading, loadingComments } = useSelector(
    (state) => state.tutorials
  );
  const user = useSelector((state) => state.auth.userProfile); // Assuming userProfile is stored in auth state

  const tutorial = tutorials.find((tutorial) => tutorial.id === parseInt(id));
  const videoId = tutorial ? extractVideoId(tutorial.video_url) : null;

  useEffect(() => {
    if (!tutorial) {
      dispatch(fetchTutorialById(id));
    } else {
      dispatch(fetchComments({ tutorialId: id, page: 1 }));
    }
  }, [dispatch, id, tutorial]);

  // Handle submitting a new comment
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setCommentSubmitting(true);

    try {
      await dispatch(addComment({ tutorialId: id, comment_text: newComment }));
      setNewComment(''); // Clear the input after successful submission
      toast.success('Comment added successfully');
    } catch (error) {
      toast.error('Failed to add comment');
    } finally {
      setCommentSubmitting(false);
    }
  };

  // Handle deleting a comment
  const handleDeleteComment = (commentId) => {
    dispatch(deleteComment(commentId));
  };

  if (loading) {
    return (
      <div className="w-full flex text-center align-items-center justify-content-center h-30rem mt-3">
        <Loading type="spin" color="#019444" height={50} width={50} />
      </div>
    );
  }

  if (!tutorial && !loading) {
    return (
      <div className="flex justify-content-center align-items-center h-30rem">
        <h4>Tutorial not found.</h4>
      </div>
    );
  }

  return (
    <div className="px-8 py-4">
      {/* Tutorial Information */}
      <div className="tutorial-detail px-4">
        <h2 className="font-normal">
          <span
            className="text-grey cursor-pointer"
            onClick={() => navigate('/tutorials')}
          >
            Gardening Tutorials /{' '}
          </span>
          {tutorial.title}
        </h2>

        <div className="flex md:flex-row">
          {videoId && (
            <div className="video-container w-full md:w-6 p-0 border-radius-xl">
              <iframe
                width="100%"
                height="300"
                src={`https://www.youtube.com/embed/${videoId}`}
                allow="autoplay; encrypted-media"
                allowFullScreen
                title={tutorial.title}
              />
            </div>
          )}
          <div className="w-full md:w-6">
            <p className="pl-6 m-0">{tutorial.description}</p>
          </div>
        </div>
      </div>

      <hr className="mx-4" />

      {/* Comment Input */}
      <div className="comments-section mt-5 px-4">
        <h3>Comments</h3>

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
              className="text-xs md:text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round-xl appearance-none outline-none focus:border-primary w-full"
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
              className="bg-primary text-white border-round-lg w-2rem p-1 px-2 pb-2 absolute right-0 my-1 mx-2 hover:bg-primary-reverse border-none"
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

        {/* Comments List */}
        {loadingComments ? (
          <div className="w-full flex text-center align-items-center justify-content-center h-30rem mt-3">
            <Loading type="spin" color="#019444" height={50} width={50} />
          </div>
        ) : comments.length > 0 ? (
          comments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              handleDelete={handleDeleteComment}
              userId={user.id}
            />
          ))
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
};

export default TutorialDetailPage;
