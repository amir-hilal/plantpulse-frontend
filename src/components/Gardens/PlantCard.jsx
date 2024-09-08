import React from 'react';
import { BsBell } from 'react-icons/bs'; // Example bell icon for notifications

const PlantCard = ({ plant }) => {
  return (
    <div
      className="surface-card shadow-2 border-round-lg p-3 flex flex-column text-xs"
      style={{ height: '100%' }}
    >
      {/* Notification and Timeline buttons */}
      <div className="flex justify-content-between align-items-center">
        <button className="">
          See Timeline
        </button>
        <div className="flex align-items-center">
          <BsBell className="mr-2" />
          <span>T, 10AM</span>
        </div>
      </div>

      {/* Plant Image */}
      <div className="flex justify-content-center my-3">
        <img
          src={plant.image_url}
          alt={plant.name}
          className="w-full border-round-lg"
          style={{ height: '200px', objectFit: 'cover' }}
        />
      </div>

      {/* Health and Category badges */}
      <div className="flex justify-content-between mb-3">
        <span
          className={`px-3 py-1 border-round-sm text-white ${
            plant.health_status === 'Healthy' ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          {plant.health_status}
        </span>
        <span className="px-3 py-1 border-round-sm bg-gray-200 text-dark">
          {plant.category}
        </span>
      </div>

      {/* Plant Name and Details */}
      <div className="text-lg font-bold mb-2">{plant.name}</div>
      <div className="text-md text-secondary mb-2">{plant.age} years old</div>

      {/* Last Watering Info */}
      <div className="flex justify-content-between mt-auto text-sm">
        <span>Last Time Watered</span>
        <span>{plant.last_time_watered}</span>
      </div>
    </div>
  );
};

export default PlantCard;
