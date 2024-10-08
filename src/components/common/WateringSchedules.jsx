import React, { useEffect } from 'react';
import Loading from 'react-loading';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import watringIcon from '../../assets/svg/Icons/watering.svg';
import {
  fetchTodayWateringSchedules,
  toggleWateringStatus,
} from '../../features/watering/wateringSlice';

const WateringSchedules = () => {
  const dispatch = useDispatch();

  const { schedules, loading, error, markingDoneById } = useSelector(
    (state) => state.watering
  );

  useEffect(() => {
    dispatch(fetchTodayWateringSchedules());
  }, [dispatch]);

  const handleToggleStatus = (plantId, eventId) => {
    dispatch(toggleWateringStatus({ plantId, eventId }))
      .unwrap()
      .catch((err) => {
        toast.error(error);
        console.error('Error toggling status:', err);
      });
  };

  const navigateToPlantDetails = (plantId) => {};

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });
  };

  // Sorting logic:
  // - First sort by uncompleted (is_done === false) events on the left
  // - Then within each group (completed or uncompleted), sort by nearest scheduled date
  const sortedSchedules = schedules.slice().sort((a, b) => {
    if (a.is_done !== b.is_done) {
      return a.is_done - b.is_done; // Uncompleted events (false) come first
    }
    return new Date(a.scheduled_date) - new Date(b.scheduled_date); // Sort by scheduled date within each group
  });

  return (
    <div className="h-full">
      {loading && (
        <div className="flex justify-content-center align-items-center h-full">
          <Loading type="spin" color="#019444" height={50} width={50} />
        </div>
      )}
      {!loading && sortedSchedules.length === 0 && (
        <p className="m-0 mx-2">No watering schedules available for today.</p>
      )}
      {!loading && sortedSchedules.length > 0 && (
        <ul className="flex p-0 m-0 h-full">
          {sortedSchedules.map((schedule) => (
            <li
              key={schedule.id}
              style={{ listStyleType: 'none' }}
              className="mr-4 h-full"
            >
              <div
                className="h-full flex flex-column align-items-center justify-content-between"
                style={{
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '20px',
                  backgroundColor: schedule.is_done ? '#e0e0e0' : '#F0F9F4',
                  width: '200px',
                  textAlign: 'center',
                  opacity: schedule.is_done ? 0.6 : 1,
                }}
              >
                <div className="flex justify-content-between w-full align-items-start">
                  <img src={watringIcon} alt="watering" className="w-4" />

                  <div>
                    <p className="m-0">
                      {formatDate(schedule.scheduled_date)}{' '}
                    </p>

                    <h3 className="mt-2">{schedule.plant_name}</h3>
                  </div>
                </div>

                {/* Mark as done or Undo */}
                <button
                  onClick={() =>
                    handleToggleStatus(schedule.plant_id, schedule.id)
                  }
                  disabled={markingDoneById[schedule.id]}
                  className="text-primary text-sm bg-transparent border-none hover:text-grey py-2  flex align-items-center justify-content-center cursor-pointer ml-1 md:ml-0"
                >
                  {markingDoneById[schedule.id]
                    ? 'Marking...'
                    : schedule.is_done
                    ? 'Undo'
                    : 'Mark as done'}
                </button>

                {/* See Plant Details button */}
                <button
                  className=" text-sm bg-primary border-round-lg border-solid border-primary hover:bg-primary-reverse py-3  flex align-items-center justify-content-center cursor-pointer ml-1 md:ml-0"
                  onClick={() => navigateToPlantDetails(schedule.plant_id)}
                >
                  See Plant Details
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WateringSchedules;
