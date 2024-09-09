import React from 'react';
import { BsBell } from 'react-icons/bs'; // Notification bell icon
import { useDispatch } from 'react-redux';
import { openTimelineModal, fetchTimelines } from '../../features/plant/timelinesSlice'; // Assuming you have these actions

const PlantCard = ({ plant }) => {
  const dispatch = useDispatch();

  const handleOpenTimeline = () => {
    dispatch(openTimelineModal());
    dispatch(fetchTimelines(plant.id));
  };

  return (
    <div
      className="surface-card shadow-2 border-round-lg p-3 flex flex-column text-xs"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url(${plant.image_url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100%',
        color: 'white'
      }}
    >
      {/* Notification and Timeline buttons */}
      <div className="flex justify-content-between align-items-center">
        <button className="p-button p-component text-xs" onClick={handleOpenTimeline}>
          See Timeline
        </button>
        <div className="flex align-items-center">
          <BsBell className="mr-2" />
          <span>T, 10AM</span>
        </div>
      </div>

      {/* Plant Name and Details */}
      <div className="flex flex-column mt-5">
        <div className="flex justify-content-between mb-2">
          <span
            className={`px-2 py-1 border-round-sm ${
              plant.health_status === 'Healthy' ? 'bg-green-500' : 'bg-red-500'
            }`}
          >
            {plant.health_status}
          </span>
          <span className="px-2 py-1 border-round-sm bg-gray-200 text-black">
            {plant.category}
          </span>
        </div>

        <div className="text-lg font-bold mb-2">{plant.name}</div>
        <div className="text-md mb-2">{plant.age} years old</div>
      </div>

      {/* Last Watering Info */}
      <div className="flex justify-content-between mt-auto text-sm">
        <span>Last Time Watered</span>
        <span>{plant.last_time_watered}</span>
      </div>
    </div>
  );
};

export default PlantCard;
