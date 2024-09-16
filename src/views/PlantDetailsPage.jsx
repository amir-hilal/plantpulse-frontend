import React, { useEffect, useRef, useState } from 'react';
import { IoIosSend } from 'react-icons/io';
import Loading from 'react-loading';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import wateringCan from '../assets/svg/Icons/watering.svg';
import EditPlantModal from '../components/Gardens/EditPlantModal';
import { fetchPlantDetails } from '../features/plant/plantsSlice';
import {
  addTimelineEvent,
  fetchTimelines,
} from '../features/plant/timelinesSlice';

const PlantDetailsPage = () => {
  const { id } = useParams(); // Get plant ID from route
  const dispatch = useDispatch();

  // State for modal visibility
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Control modal visibility

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
    if (
      timelineRef.current.scrollTop === 0 &&
      hasMore &&
      !timelineLoading &&
      !fetching
    ) {
      setFetching(true);
      dispatch(fetchTimelines({ plantId: id, page })).finally(() => {
        setFetching(false);
      });
    }
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  useEffect(() => {
    if (!timelineLoading && timelines.length && timelineRef.current) {
      timelineRef.current.scrollTop = timelineRef.current.scrollHeight;
    }
  }, [timelineLoading, timelines]);

  const handlePostMessage = async () => {
    if (!postMessage && !selectedImage) return;
    setLoadingPost(true);

    const formData = new FormData();
    formData.append('plant_id', id);
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
    return (
      <div className="flex justify-content-center align-items-center h-screen">
        Plant data not available.
      </div>
    );
  }

  return (
    <div className="relative flex flex-column h-37rem w-full">
      <div className="flex justify-content-between align-items-center p-4 bg-tint-5">
        <div className="flex align-items-center">
          <Link to="/my-gardens" className="text-primary">
            {garden_name || 'Garden'}
          </Link>
          <h3 className="ml-2 my-0"> / {plant.plant.name}</h3>
        </div>
        <div className="flex align-items-center">
          <span className="px-3 py-2 border-round-xl bg-gray-300 text-black">
            {plant.plant.formatted_age}
          </span>
          <span className="px-3 py-2 border-round-xl bg-gray-300 text-black ml-2">
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
        <button
          onClick={() => setIsEditModalOpen(true)}
          className=" h-full bg-primary border-none  hover:bg-primary-reverse text-white py-2 px-4 border-round-xl ml-4"
        >
          Edit Plant
        </button>
      </div>

      <div
        className="timeline-container flex-grow overflow-y-auto  mb-3 mx-2 md:mx-4 lg:mx-8 lg:px-4"
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
            .reverse()
            .map((event, index) => (
              <div
                key={index}
                className="timeline-event border-round p-2 mb-2 shadow-1"
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

      <div
        style={styles.inputContainer}
        className="fixed flex bottom-0 left-0 w-full bg-white  py-2 px-2 md:px-4 lg:px-8 justify-content-center"
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

      {isEditModalOpen && (
        <EditPlantModal
          plant={plant.plant}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
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

  input: {
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
