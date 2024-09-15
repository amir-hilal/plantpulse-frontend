import React, { useEffect, useState } from 'react';
import Loading from 'react-loading';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import wateringCan from '../assets/svg/Icons/watering.svg';
import { fetchPlantDetails } from '../features/plant/plantsSlice';
import {
  addTimelineEvent,
  fetchTimelines,
} from '../features/plant/timelinesSlice';

const PlantDetailsPage = () => {
  const { id } = useParams(); // Get plant ID from route
  const dispatch = useDispatch();

  // Separate loading states
  const {
    plant,
    garden_name,
    loading: plantLoading,
  } = useSelector((state) => state.plants);
  const { timelines, loading: timelineLoading } = useSelector(
    (state) => state.timelines
  );

  const [postMessage, setPostMessage] = useState('');
  const [loadingPost, setLoadingPost] = useState(false);
  const [timelinesFetched, setTimelinesFetched] = useState(false); // Track whether timelines have been fetched

  useEffect(() => {
    dispatch(fetchPlantDetails(id)); // Fetch plant details on component mount
  }, [dispatch, id]);

  const handleFetchTimelines = () => {
    if (!timelinesFetched) {
      dispatch(fetchTimelines(id)); // Fetch plant timelines lazily
      setTimelinesFetched(true);
    }
  };

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

  // Background color based on health status
  const getHealthStatusBackground = (status) => {
    switch (status) {
      case 'Healthy':
        return 'bg-green-500';
      case 'Unhealthy':
        return 'bg-yellow-500';
      case 'Diseased':
        return 'bg-red-500';
      case 'Recovering':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  if (plantLoading) {
    return (
      <div className="flex justify-content-center align-items-center h-screen">
        <Loading type="spin" color="#019444" height={50} width={50} />
      </div>
    );
  }

  if (!plant || !plant.plant) {
    // Fallback for when plant data isn't available yet
    return (
      <div className="flex justify-content-center align-items-center h-screen">
        Plant data not available.
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* Breadcrumb navigation */}
      <div className="flex align-items-center mb-4 text-underline justify-content-between">
        <div className="flex align-items-center">
          <Link to="/my-gardens" className="text-primary">
            {garden_name || 'Garden'}
          </Link>
          <h3 className="ml-2 my-0"> / {plant.plant.name}</h3>
        </div>

        <div className="flex">
          <span className="px-3 py-2 border-round-xl bg-gray-200 text-black">
            {plant.plant.category}
          </span>
          <span
            className={`px-3 py-2 border-round-xl ml-2 ${getHealthStatusBackground(
              plant.plant.health_status
            )}`}
          >
            {plant.plant.health_status}
          </span>
          <div className=" border-round-xl text-secondary align-self-end border-none surface-300 px-3 py-1 flex align-items-center cursor-pointer ml-2">
            <img src={wateringCan} alt="watering" className="mr-2" />
            <span className="text-secondary">
              {new Intl.DateTimeFormat('en-GB', {
                day: '2-digit',
                month: 'short',
              }).format(new Date(plant.plant.next_time_to_water))}
            </span>
          </div>
        </div>
      </div>

      {/* Lazy Load Timeline */}
      <div className="timeline-container mt-4">
        <h2>Plant Timeline</h2>
        {!timelinesFetched ? (
          <button
            className="bg-primary text-white py-2 px-4 border-round cursor-pointer"
            onClick={handleFetchTimelines}
          >
            Load Timeline
          </button>
        ) : timelineLoading ? (
          <Loading type="spin" color="#019444" />
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
            <Loading type="spin" color="#019444" height={20} width={20} />
          ) : (
            'Post Update'
          )}
        </button>
      </div>
    </div>
  );
};

export default PlantDetailsPage;
