import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loading from 'react-loading';
import { fetchTutorialById, fetchComments } from '../features/tutorials/tutorialsSlice';

const TutorialDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { tutorial, comments, loading } = useSelector((state) => state.tutorials);

  // Fetch the tutorial details and its comments when the component mounts
  useEffect(() => {
    dispatch(fetchTutorialById(id));
    dispatch(fetchComments(id));
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="w-full flex text-center align-items-center justify-content-center h-30rem mt-3">
        <Loading type="spin" color="#019444" height={50} width={50} />
      </div>
    );
  }

  if (!tutorial) {
    return (
      <div className="flex justify-content-center align-items-center h-30rem">
        <h4>Tutorial not found.</h4>
      </div>
    );
  }

  return (
    <div className="px-6 py-4">
      {/* Tutorial Information */}
      <div className="tutorial-detail">
        <h2>{tutorial.title}</h2>
        <p>{tutorial.description}</p>
        <div className="video-container">
          <iframe
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${tutorial.video_id}`}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title={tutorial.title}
          />
        </div>
      </div>

      {/* Comments Section */}
      <div className="comments-section mt-5">
        <h3>Comments</h3>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="comment">
              <p><strong>{comment.user.name}</strong></p>
              <p>{comment.content}</p>
            </div>
          ))
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
};

export default TutorialDetailPage;
