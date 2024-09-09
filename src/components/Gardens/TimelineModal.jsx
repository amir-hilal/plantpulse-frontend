import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { closeTimelineModal } from '../../features/plant/timelinesSlice';

const TimelineModal = () => {
  const dispatch = useDispatch();
  const { modalOpen, timelines } = useSelector((state) => state.timelines);
  if (!modalOpen) return null;

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex justify-content-center align-items-center"
      style={{ backgroundColor: 'rgba(22, 29, 33, 0.5)' }}
    >
      <div className="relative bg-white border-round-xl p-6 w-11 sm:w-8 md:w-8 lg:w-8 shadow-4 overflow-hidden">
        <button
          onClick={() => dispatch(closeTimelineModal())}
          className="absolute top-0 right-0 mt-3 mr-3 cursor-pointer bg-transparent border-none"
        >
          <FaTimes className="text-2xl text-secondary" />
        </button>
        <h2 className="text-center m-0">Plant Timeline</h2>
        {/* Render the timeline */}
        {timelines.map((event, index) => (
          <div key={index} className="timeline-event">
            <p>{event.description}</p>
            {event.image_path && (
              <img src={event.image_path} alt="timeline event" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimelineModal;
