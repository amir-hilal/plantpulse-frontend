import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWateringSchedules } from './wateringSlice'; // Import the action

const WateringSchedules = ({ plantId }) => {
  const dispatch = useDispatch();

  const { schedules, loading, error } = useSelector((state) => state.watering);

  useEffect(() => {
    // Fetch the watering schedules when the component mounts
    if (!loading && schedules.length === 0) {
      dispatch(fetchWateringSchedules(plantId));
    }
  }, [loading, dispatch, plantId, schedules]);

  return (
    <div>
      <h2>Watering Schedules</h2>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <ul>
          {schedules.map((schedule) => (
            <li key={schedule.id}>
              Watering scheduled on: {new Date(schedule.scheduled_date).toLocaleDateString()}
              {schedule.is_done ? ' (Completed)' : ' (Pending)'}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WateringSchedules;
