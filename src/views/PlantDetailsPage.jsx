import React, { useEffect, useState } from 'react';
import Loading from 'react-loading';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchPlantDetails } from '../features/plant/plantsSlice'; 
import {
  addTimelineEvent,
  fetchTimelines,
} from '../features/plant/timelinesSlice';

const PlantDetailsPage = () => {
  const { id } = useParams(); // Get plant ID from route
  const dispatch = useDispatch();
  const { timelines, loading } = useSelector((state) => state.timelines);
  const { plant, gardenName } = useSelector((state) => state.plants); // Assume `plant` holds current plant info

  const [postMessage, setPostMessage] = useState('');
  const [loadingPost, setLoadingPost] = useState(false);

  useEffect(() => {
    dispatch(fetchPlantDetails(id)); // Fetch plant details on component mount
    dispatch(fetchTimelines(id)); // Fetch plant timelines on component mount
  }, [dispatch, id]);

  const handlePostMessage = async () => {
    if (!postMessage) return;
    setLoadingPost(true);
    try {
      await dispatch(
        addTimelineEvent({ plantId: id, message: postMessage })
      ).unwrap();
      setPostMessage('');
      toast.success('Post added successfully');
    } catch (error) {
      toast.error('Failed to add post');
    } finally {
      setLoadingPost(false);
    }
  };

  return (
    <div className="p-4">
      {/* Breadcrumb navigation */}
      <div className="flex align-items-center mb-4">
        <Link to="/my-gardens" className="text-primary">
          {gardenName} / {plant.name}
        </Link>
      </div>

      {/* Plant Details */}
      {loading ? (
        <Loading type="spin" color="#000" />
      ) : (
        <>
          <h1>{plant.name}</h1>
          <p>Category: {plant.category}</p>
          <p>Health Status: {plant.health_status}</p>
        </>
      )}

      {/* Timeline of Plant Updates */}
      <div className="timeline-container mt-4">
        <h2>Plant Timeline</h2>
        {loading ? (
          <Loading type="spin" color="#000" />
        ) : (
          timelines.map((event, index) => (
            <div
              key={index}
              className="timeline-event border-round p-2 mb-2 shadow-2"
            >
              <p>{event.description}</p>
              {event.image_path && (
                <img
                  src={event.image_path}
                  alt="timeline event"
                  className="border-round"
                />
              )}
            </div>
          ))
        )}
      </div>

      {/* Input for Posting New Updates */}
      <div className="mt-4">
        <h3>Add a New Update</h3>
        <textarea
          className="w-full border-1 p-2 border-round"
          value={postMessage}
          onChange={(e) => setPostMessage(e.target.value)}
          placeholder="Write an update..."
        />
        <button
          className="mt-2 bg-primary text-white py-2 px-4 border-round cursor-pointer"
          onClick={handlePostMessage}
          disabled={loadingPost}
        >
          {loadingPost ? (
            <Loading type="spin" color="#fff" height={20} width={20} />
          ) : (
            'Post Update'
          )}
        </button>
      </div>
    </div>
  );
};

export default PlantDetailsPage;
