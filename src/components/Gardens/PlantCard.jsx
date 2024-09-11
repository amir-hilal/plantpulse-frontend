import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa'; // Import the trash bin icon
import { useDispatch } from 'react-redux';
import wateringCan from '../../assets/svg/Icons/watering.svg';
import { deletePlant } from '../../features/plant/plantsSlice'; // Action to handle plant deletion
import {
  fetchTimelines,
  openTimelineModal,
} from '../../features/plant/timelinesSlice';
import ConfirmationModal from '../common/ConfirmationModal';

const PlantCard = ({ plant }) => {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false); // To track hover state
  const [isModalOpen, setModalOpen] = useState(false); // To control modal visibility

  const handleOpenTimeline = () => {
    dispatch(openTimelineModal());
    dispatch(fetchTimelines(plant.id));
  };

  const handleDelete = () => {
    setModalOpen(true); // Show the modal when delete is clicked
  };

  const confirmDelete = () => {
    dispatch(deletePlant(plant.id)); // Dispatch the delete action
    setModalOpen(false); // Close the modal after deletion
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

  return (
    <>
      <div
        className="surface-card shadow-1 border-round-2xl p-3 flex flex-column text-xs justify-content-between relative"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9)), url(${plant.image_url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100%',
          color: 'white',
        }}
        onMouseEnter={() => setIsHovered(true)} // Track hover state
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Notification and Timeline buttons */}
        <div className="flex justify-content-between align-items-center">
          <button
            className="border-round-lg text-secondary border-none surface-300 hover:surface-400 h-full text-xs cursor-pointer"
            onClick={handleOpenTimeline}
          >
            See Timeline
          </button>
          <div className=" border-round-lg text-secondary border-none surface-300 px-2 flex align-items-center">
            <img src={wateringCan} alt="watering" className="mr-2" />
            <span className="text-secondary">T, 10AM</span>
          </div>
        </div>

        <div>
          {/* Plant Name and Details */}
          <div className="flex flex-column mt-5">
            <div className="flex justify-content-between mb-2">
              <span
                className={`px-2 py-1 border-round-sm ${getHealthStatusBackground(
                  plant.health_status
                )}`}
              >
                {plant.health_status}
              </span>
              <span className="px-2 py-1 border-round-sm bg-gray-200 text-black">
                {plant.category}
              </span>
            </div>

            <div className=" mb-2 flex justify-content-between align-items-start">
              <h2 className="text-left text-lg font-bold m-0">{plant.name}</h2>{' '}
              <span className="text-right text-sm w-6rem">
                Last Time Watered
              </span>
            </div>
            <div className=" mb-2 flex justify-content-between align-items-start">
              <p className="text-left m-0">{plant.formatted_age}</p>{' '}
              <span className="text-right text-sm w-6rem">
                {plant.last_watered}
              </span>
            </div>
          </div>
        </div>

        {/* Trash button (only visible on hover) */}
        {isHovered && (
          <button
            className="absolute top-3 right-3 bg-red-600 text-white p-2 border-round-full cursor-pointer"
            onClick={handleDelete}
          >
            <FaTrash />
          </button>
        )}
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this plant?"
      />
    </>
  );
};

export default PlantCard;
