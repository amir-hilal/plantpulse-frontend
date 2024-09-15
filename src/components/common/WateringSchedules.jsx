import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWateringSchedules } from '../../features/watering/wateringSlice';

const WateringSchedules = () => {
  const dispatch = useDispatch();

  const { schedules, loading, error } = useSelector((state) => state.watering);

  useEffect(() => {
    dispatch(fetchWateringSchedules());
  }, [dispatch]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && schedules.length === 0 && (
        <p>No watering schedules available.</p>
      )}
      {!loading && !error && schedules.length > 0 && (
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
