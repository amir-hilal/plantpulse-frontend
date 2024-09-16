import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeekWateringSchedules } from '../../features/watering/wateringSlice';
import watringIcon from '../../assets/svg/Icons/watering.svg';

const WeeklyCalendar = () => {
  const dispatch = useDispatch();
  const { weekSchedules, loading } = useSelector((state) => state.watering);

  const today = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format

  useEffect(() => {
    dispatch(fetchWeekWateringSchedules());
  }, [dispatch]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short', // "Sun"
      day: 'numeric', // "15"
      month: 'short', // "Sep"
    });
  };

  return (
    <div className="p-4">
      <h2 className="mb-4">This Week's Watering Schedule</h2>
      {loading && <p>Loading schedules...</p>}
      {!loading && weekSchedules.length === 0 && <p>No watering schedules for this week.</p>}
      {!loading && weekSchedules.length > 0 && (
        <div className="grid grid-nogutter">
          {weekSchedules.map((schedule) => (
            <div key={schedule.id} className="col-12 md:col-3 p-2">
              <div
                className="card flex flex-column align-items-center justify-content-between"
                style={{
                  backgroundColor: schedule.is_done ? '#e0e0e0' : '#F0F9F4',
                  opacity: schedule.is_done ? 0.6 : 1,
                }}
              >
                <div className="flex justify-content-between w-full align-items-start">
                  <img src={watringIcon} alt="watering" className="w-4" />
                  <div>
                    <p className="m-0">{formatDate(schedule.scheduled_date)}</p>
                    <h3 className="mt-2">{schedule.plant_name}</h3>
                  </div>
                </div>

                {schedule.scheduled_date === today && (
                  <button
                    className="text-primary text-sm bg-transparent border-none hover:text-grey py-2  flex align-items-center justify-content-center cursor-pointer ml-1 md:ml-0"
                  >
                    Mark as done
                  </button>
                )}

                <button
                  className="text-sm bg-primary border-round-lg border-solid border-primary hover:bg-primary-reverse py-3  flex align-items-center justify-content-center cursor-pointer ml-1 md:ml-0"
                >
                  See Plant Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeeklyCalendar;
