import React from 'react';
import { BsBell } from 'react-icons/bs'; // Notification bell icon
import { useDispatch } from 'react-redux';
import {
  fetchTimelines,
  openTimelineModal,
} from '../../features/plant/timelinesSlice'; // Assuming you have these actions

const PlantCard = ({ plant }) => {
  const dispatch = useDispatch();

  const handleOpenTimeline = () => {
    dispatch(openTimelineModal());
    dispatch(fetchTimelines(plant.id));
  };

  return (
    <div
      className="surface-card shadow-2 border-round-lg p-3 flex flex-column text-xs justify-content-between"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9)), url(${plant.image_url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100%',
        color: 'white',
      }}
    >
      {/* Notification and Timeline buttons */}
      <div className="flex justify-content-between align-items-center">
        <button
          className="p-button p-component text-xs"
          onClick={handleOpenTimeline}
        >
          See Timeline
        </button>
        <div className="flex align-items-center">
          <BsBell className="mr-2" />
          <span>T, 10AM</span>
        </div>
      </div>

      <div>
        {/* Plant Name and Details */}
        <div className="flex flex-column mt-5">
          <div className="flex justify-content-between mb-2">
            <span
              className={`px-2 py-1 border-round-sm ${
                plant.health_status === 'Healthy'
                  ? 'bg-green-500'
                  : 'bg-red-500'
              }`}
            >
              {plant.health_status}
            </span>
            <span className="px-2 py-1 border-round-sm bg-gray-200 text-black">
              {plant.category}
            </span>
          </div>

          <div className=" mb-2 flex justify-content-between align-items-start">
            <h2 className="text-left text-lg font-bold m-0">{plant.name}</h2>{' '}
            <span className="text-right text-sm w-6rem">Last Time Watered</span>
          </div>
          <div className=" mb-2 flex justify-content-between align-items-start">
            <p className="text-left m-0">{plant.age} years old</p>{' '}
            <span className="text-right text-sm w-6rem">
              {plant.last_watered}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantCard;
