import { addDays, format, isSameDay, startOfWeek } from 'date-fns';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import watringIcon from '../../assets/svg/Icons/watering.svg';
import { fetchWeekWateringSchedules } from '../../features/watering/wateringSlice';

const WeeklyCalendar = () => {
  const dispatch = useDispatch();
  const { weekSchedules, loading } = useSelector((state) => state.watering);

  const today = new Date();

  // Get the start of the current week (Sunday)
  const startOfCurrentWeek = startOfWeek(today, { weekStartsOn: 0 }); // Adjust `weekStartsOn` for your locale

  // Create an array of the 7 days in the current week
  const weekDays = Array.from({ length: 7 }, (_, i) =>
    addDays(startOfCurrentWeek, i)
  );

  useEffect(() => {
    dispatch(fetchWeekWateringSchedules());
  }, [dispatch]);

  const formatDate = (date) => {
    return format(new Date(date), 'EEE, MMM d'); // "Sun, Sep 15"
  };

  const groupByDay = (schedules) => {
    return weekDays.map((day) => ({
      day,
      schedules: schedules.filter((schedule) =>
        isSameDay(new Date(schedule.scheduled_date), day)
      ),
    }));
  };

  const weekSchedulesByDay = groupByDay(weekSchedules);

  return (
    <div className="p-4">
      <h2 className="mb-4">This Week's Watering Schedule</h2>
      {loading && <p>Loading schedules...</p>}
      {!loading && weekSchedules.length === 0 && (
        <p>No watering schedules for this week.</p>
      )}
      {!loading && weekSchedules.length > 0 && (
        <div className="grid grid-nogutter w-full">
          {weekSchedulesByDay.map(({ day, schedules }) => (
            <div key={day} className="col-12 md:col-2 p-2">
              <div className="day-column text-center">
                <p className="font-bold">{format(day, 'EEE')}</p>
                <p>{format(day, 'MMM d')}</p>
                {schedules.length === 0 ? (
                  <p className="text-muted">No events</p>
                ) : (
                  schedules.map((schedule) => (
                    <div
                      key={schedule.id}
                      className="card flex flex-column align-items-center justify-content-between my-2"
                      style={{
                        backgroundColor: schedule.is_done
                          ? '#e0e0e0'
                          : '#F0F9F4',
                        opacity: schedule.is_done ? 0.6 : 1,
                      }}
                    >
                      <div className="flex justify-content-between w-full align-items-start">
                        <img src={watringIcon} alt="watering" className="w-4" />
                        <div>
                          <h3 className="mt-2">{schedule.plant_name}</h3>
                        </div>
                      </div>
                      {isSameDay(new Date(schedule.scheduled_date), today) && (
                        <button className="text-primary text-sm bg-transparent border-none hover:text-grey py-2 flex align-items-center justify-content-center cursor-pointer ml-1 md:ml-0">
                          Mark as done
                        </button>
                      )}
                      <button className="text-sm bg-primary border-round-lg border-solid border-primary hover:bg-primary-reverse py-3 flex align-items-center justify-content-center cursor-pointer ml-1 md:ml-0">
                        See Plant Details
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeeklyCalendar;
