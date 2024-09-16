import React, { useEffect, useRef, useState } from 'react';
import { IoIosSend } from 'react-icons/io';
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
  const {
    timelines,
    loading: timelineLoading,
    loadingMore,
    hasMore,
    page,
  } = useSelector((state) => state.timelines);
  const [selectedImage, setSelectedImage] = useState(null);

  const [postMessage, setPostMessage] = useState('');
  const [loadingPost, setLoadingPost] = useState(false);
  const [fetching, setFetching] = useState(false); // Track whether a fetch request is ongoing
  const timelineRef = useRef(null); // Ref for the timeline container

  useEffect(() => {
    dispatch(fetchPlantDetails(id)); // Fetch plant details on component mount
    dispatch(fetchTimelines({ plantId: id, page: 1 })); // Fetch the first page of timelines
  }, [dispatch, id]);

  const handleScroll = () => {
    // Debounce the scroll event
    if (
      timelineRef.current.scrollTop === 0 &&
      hasMore &&
      !timelineLoading &&
      !fetching
    ) {
      setFetching(true); // Prevent multiple simultaneous requests
      dispatch(fetchTimelines({ plantId: id, page })).finally(() => {
        setFetching(false); // Reset fetching state once the request completes
      });
    }
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  useEffect(() => {
    // Scroll to bottom after the initial fetch or a new message
    if (!timelineLoading && timelines.length && timelineRef.current) {
      timelineRef.current.scrollTop = timelineRef.current.scrollHeight;
    }
  }, [timelineLoading, timelines]);
  const handlePostMessage = async () => {
    if (!postMessage && !selectedImage) return;
    setLoadingPost(true);

    const formData = new FormData();
    formData.append('plant_id', id); // Append plant_id to FormData
    formData.append('description', postMessage);
    if (selectedImage) {
      formData.append('image', selectedImage);
    }

    try {
      await dispatch(addTimelineEvent({ plant_id: id, formData })).unwrap();
      setPostMessage('');
      setSelectedImage(null);
      toast.success('Update added successfully');
    } catch (error) {
      toast.error('Failed to post update');
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
    <div className="relative flex flex-column h-37rem">
      {/* Plant Info - Fixed at the top */}
      <div className="flex justify-content-between align-items-center p-4 ">
        <div className="flex align-items-center">
          <Link to="/my-gardens" className="text-primary">
            {garden_name || 'Garden'}
          </Link>
          <h3 className="ml-2 my-0"> / {plant.plant.name}</h3>
        </div>
        <div className="flex align-items-center">
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
          <div className="border-round-xl flex align-items-center cursor-pointer ml-2">
            <img src={wateringCan} alt="watering" className="mr-2" />
            <span>
              {new Intl.DateTimeFormat('en-GB', {
                day: '2-digit',
                month: 'short',
              }).format(new Date(plant.plant.next_time_to_water))}
            </span>
          </div>
        </div>
      </div>

      {/* Timeline - Scrollable */}
      <div
        className="timeline-container flex-grow overflow-y-auto px-4 mb-5"
        ref={timelineRef}
        onScroll={handleScroll}
      >
        {loadingMore && (
          <div className="flex justify-content-center mb-4">
            <Loading type="spin" color="#019444" height={30} width={30} />
          </div>
        )}
        {timelineLoading ? (
          <div className="flex justify-content-center align-items-center h-screen">
            <Loading type="spin" color="#019444" height={50} width={50} />
          </div>
        ) : (
          timelines
            .slice()
            .reverse() // Reverse the order of events so the latest is at the bottom
            .map((event, index) => (
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

      {/* Chat Input - Fixed at the bottom */}
      <div
        style={styles.inputContainer}
        className="fixed flex bottom-0 left-0 w-full bg-white px-8 py-2 border-t"
      >
        <input
          type="text"
          value={postMessage}
          onChange={(e) => setPostMessage(e.target.value)}
          placeholder="Write an update..."
          style={styles.input}
          className="appearance-none outline-none focus:border-primary"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handlePostMessage();
            }
          }}
        />
        <input type="file" onChange={handleImageChange} accept="image/*" />
        <button
          onClick={handlePostMessage}
          style={styles.sendButton}
          disabled={loadingPost}
          className={`${
            loadingPost ? 'surface-700 cursor-auto' : ' cursor-pointer'
          }`}
        >
          {loadingPost ? (
            <Loading type="spin" color="#019444" height={20} width={20} />
          ) : (
            <IoIosSend className="text-lg" />
          )}
        </button>
      </div>
    </div>
  );
};

const styles = {
  profilePic: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    marginRight: '10px',
  },
  inputContainer: {
    display: 'flex',
    padding: '10px',
  },
  input: {
    flex: 1,
    padding: '10px',
    borderRadius: '18px',
    border: '1px solid #ccc',
    marginRight: '10px',
  },
  sendButton: {
    padding: '10px',
    backgroundColor: '#263238',
    color: '#fff',
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
  },
};

export default PlantDetailsPage;
