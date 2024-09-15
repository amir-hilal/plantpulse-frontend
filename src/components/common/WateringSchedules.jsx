import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWateringSchedules } from '../../features/watering/wateringSlice';

const WateringSchedules = () => {
  const dispatch = useDispatch();

  const { schedules, loading, error } = useSelector((state) => state.watering);

  useEffect(() => {
    // Only dispatch the fetch action if not loading and schedules are empty
    if (!loading && schedules.length === 0) {
      dispatch(fetchWateringSchedules());
    }
  }, [loading, dispatch, schedules.length]);

  return (
    <div>
      <h2>Watering Schedules</h2>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <ul>
          {schedules.map((schedule) => (
            <li key={schedule.id}>
              Watering scheduled on:{' '}
              {new Date(schedule.scheduled_date).toLocaleDateString()}
              {schedule.is_done ? ' (Completed)' : ' (Pending)'}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WateringSchedules;
