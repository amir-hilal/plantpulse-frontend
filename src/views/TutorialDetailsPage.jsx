import React, { useEffect } from 'react';
import Loading from 'react-loading';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
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

  const { tutorials, comments, loading, loadingComments } = useSelector(
    (state) => state.tutorials
  );

  const tutorial = tutorials.find((tutorial) => tutorial.id === parseInt(id));

  const videoId = tutorial ? extractVideoId(tutorial.video_url) : null;

  useEffect(() => {
    if (!tutorial) {
      dispatch(fetchTutorialById(id));
    } else {
      dispatch(fetchComments({ tutorialId: id, page: 1 }));
    }
  }, [dispatch, id, tutorial]);

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
      <div className="comments-section mt-5 px-4">
        <h3>Comments</h3>
        {loadingComments ? (
          <div className="w-full flex text-center align-items-center justify-content-center h-30rem mt-3">
            <Loading type="spin" color="#019444" height={50} width={50} />
          </div>
        ) : comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="comment">
              <p>
                <strong>{comment.user.name}</strong>
              </p>
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
