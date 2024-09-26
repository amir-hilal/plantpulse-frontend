import { debounce } from 'lodash';
import Markdown from 'markdown-to-jsx';
import React, { useEffect, useRef, useState } from 'react';
import { IoIosAttach, IoIosCloseCircle, IoIosSend } from 'react-icons/io';
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
  const { id } = useParams();
  const dispatch = useDispatch();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const {
    plant,
    garden_name,
    loading: plantLoading,
  } = useSelector((state) => state.plants);
  const {
    timelines,
    loading: timelineLoading,
    loadingMore,
    page,
    hasMore,
  } = useSelector((state) => state.timelines);

  const [selectedImage, setSelectedImage] = useState(null);
  const [postMessage, setPostMessage] = useState('');
  const [typing, setTyping] = useState(false); // For AI typing indicator
  const [fetching, setFetching] = useState(false);
  const timelineRef = useRef(null);

  useEffect(() => {
    dispatch(fetchPlantDetails(id));
    dispatch(fetchTimelines({ plantId: id, page: 1 }));
  }, [dispatch, id]);

  const handleScroll = debounce(() => {
    if (
      timelineRef.current.scrollTop === 0 &&
      hasMore &&
      !timelineLoading &&
      !fetching
    ) {
      const previousHeight = timelineRef.current.scrollHeight;
      setFetching(true);
      dispatch(fetchTimelines({ plantId: id, page })).finally(() => {
        setFetching(false);
        setTimeout(() => {
          const newHeight = timelineRef.current.scrollHeight;
          timelineRef.current.scrollTop = newHeight - previousHeight;
        }, 100);
      });
    }
  }, 1000);

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    if (timelines.length && timelineRef.current) {
      timelineRef.current.scrollTop = timelineRef.current.scrollHeight;
    }
  }, [timelines]);

  const handlePostMessage = async () => {
    if (!postMessage && !selectedImage) return;

    const userTimeline = {
      description: postMessage,
      image_path: selectedImage ? URL.createObjectURL(selectedImage) : null,
      source: 'user',
    };

    // Immediately append the user's message to the timeline
    dispatch({ type: 'timelines/addTempTimeline', payload: userTimeline });

    setPostMessage('');
    setSelectedImage(null);

    const formData = new FormData();
    formData.append('plant_id', id);
    formData.append('description', postMessage);
    if (selectedImage) {
      formData.append('image', selectedImage);
    }

    try {
      setTyping(true);
      await dispatch(addTimelineEvent({ plant_id: id, formData })).unwrap();
      toast.success('Update added successfully');
    } catch (error) {
      toast.error('Failed to post update');
    } finally {
      setTyping(false);
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
    <div className="relative flex flex-column  h-37rem w-full">
      <div className="flex flex-column md:flex-row justify-content-between align-items-center p1 md:p-2 lg:p-3 bg-tint-5">
        <div className="flex align-items-center">
          <Link to="/my-gardens" className="text-primary text-xs md:text-base">
            {garden_name || 'Garden'}
          </Link>
          <h3 className="ml-2 my-0 text-xs md:text-base">
            {' '}
            / {plant.plant.name}
          </h3>
        </div>
        <div className="flex align-items-center text-xs md:text-base my-2 md:my-0">
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
          className=" h-full bg-primary border-none  hover:bg-primary-reverse text-white py-2 px-4 border-round-xl ml-4 text-xs md:text-base"
        >
          Edit Plant
        </button>
      </div>

      <div
        className="timeline-container align-self-center flex flex-column overflow-y-auto mx-4 md:mx-4 lg:mx-8 lg:px-4"
        ref={timelineRef}
        onScroll={handleScroll}
        style={styles.timelineContainer}
      >
        {loadingMore && (
          <div className="flex justify-content-center mb-4">
            <Loading type="spin" color="#019444" height={30} width={30} />
          </div>
        )}
        {timelines.slice().map((event, index) => (
          <div
            key={index}
            className={`timeline-event p-2 mb-2 shadow-1 border-round-xl ${
              event.source === 'user'
                ? 'surface-100 max-w-29rem align-self-end p-2'
                : 'bg-transparent w-full'
            }`}
            style={event.source === 'user' ? { width: 'fit-content' } : {}} // Inline style for user messages
          >
            {event.image_path && (
              <img
                src={event.image_path}
                alt="timeline event"
                className="border-round w-full"
              />
            )}
            <Markdown>{event.description}</Markdown>
          </div>
        ))}

        {/* AI Typing Indicator */}
        {typing && (
          <div className="flex justify-content-center align-items-center mb-2">
            <Loading type="spin" color="#019444" height={30} width={30} />
            <p className="ml-2">Assistant is typing...</p>
          </div>
        )}
      </div>

      {/* chat input and image */}
      <div
        style={styles.inputContainer}
        className="fixed flex bottom-0 left-0 w-full rounded-full py-2 px-2 md:px-4 lg:px-8 justify-content-center items-center"
      >
        <div className="flex-grow w-8 relative flex align-items-center border border-gray-300 rounded-full">
          <label className="absolute left-0 text-lg ml-4 cursor-pointer">
            <input
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
            <IoIosAttach className="text-xl" />
          </label>

          {/* Image Preview */}
          {selectedImage && (
            <div className="ml-10 flex items-center relative">
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Preview"
                className="rounded-full"
                style={styles.imagePreview}
              />
              <IoIosCloseCircle
                className="absolute -top-2 -right-2 text-xl cursor-pointer"
                style={styles.removeIcon}
                onClick={handleRemoveImage}
              />
            </div>
          )}

          <input
            type="text"
            style={styles.input}
            value={postMessage}
            onChange={(e) => setPostMessage(e.target.value)}
            placeholder="Ask about your plant..."
            className="appearance-none pl-6 outline-none flex-grow ml-2 bg-transparent placeholder-gray-500"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handlePostMessage();
              }
            }}
          />
        </div>

        <button
          onClick={handlePostMessage}
          style={styles.sendButton}
          disabled={typing}
          className={`${
            typing
              ? 'surface-700 cursor-auto rounded-full p-2 mx-2'
              : 'cursor-pointer rounded-full p-2 mx-2 bg-green-500'
          }`}
        >
          {typing ? (
            <Loading type="spin" color="#fff" height={20} width={20} />
          ) : (
            <IoIosSend className="text-xl text-white" />
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
  timelineContainer: {
    width:'65vw'
  },
  inputContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  profilePic: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    marginRight: '10px',
  },

  input: {
    padding: '10px',
    width: '100%',
    borderRadius: '18px',
    border: '1px solid #ccc',
    outline: 'none',
    backgroundColor: 'transparent',
    marginLeft: '10px',
  },
  sendButton: {
    padding: '10px',
    backgroundColor: '#263238',
    color: '#fff',
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
  },
  imagePreview: {
    width: '80px',
    height: '80px',
    objectFit: 'cover',
    borderRadius: '5px',
    marginLeft: '10px',
  },
  removeIcon: {
    color: 'red',
    top: '-5px',
    right: '-5px',
  },
};

export default PlantDetailsPage;
