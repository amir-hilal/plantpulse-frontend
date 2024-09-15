import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import watringIcon from '../../assets/svg/Icons/watering.svg';
import {
  fetchWateringSchedules,
  markWateringAsDone,
} from '../../features/watering/wateringSlice';

const WateringSchedules = () => {
  const dispatch = useDispatch();

  const { schedules, loading, error, markingDoneById } = useSelector(
    (state) => state.watering
  );

  useEffect(() => {
    dispatch(fetchWateringSchedules());
  }, [dispatch]);

  const handleMarkAsDone = (plantId, eventId) => {
    dispatch(markWateringAsDone({ plantId, eventId }));
  };

  const navigateToPlantDetails = (plantId) => {
    // Logic to navigate to plant details
  };

  return (
    <div className="h-full">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && schedules.length === 0 && (
        <p>No watering schedules available.</p>
      )}
      {!loading && !error && schedules.length > 0 && (
        <ul className="flex p-0 m-0 h-full">
          {schedules.map((schedule) => (
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
                  backgroundColor: schedule.is_done ? '#e0e0e0' : '#F0F9F4', // Lower opacity for completed schedules
                  width: '200px',
                  textAlign: 'center',
                  opacity: schedule.is_done ? 0.6 : 1, // Reduce opacity when completed
                }}
              >
                <div className="flex justify-content-between w-full align-items-start">
                  {/* Icon for watering */}
                  <img src={watringIcon} alt="watering" className="w-4" />

                  <div>
                    <p className="m-0">
                      {new Date(schedule.scheduled_date).toLocaleTimeString(
                        [],
                        {
                          hour: '2-digit',
                          minute: '2-digit',
                        }
                      )}
                    </p>

                    <h3 className="mt-2">{schedule.plant_name}</h3>
                  </div>
                </div>

                {/* Display the scheduled time and plant name */}

                {/* Mark as done */}
                {!schedule.is_done ? (
                  <button
                    onClick={() =>
                      handleMarkAsDone(schedule.plant_id, schedule.id)
                    }
                    disabled={markingDoneById[schedule.id]} // Disable button while loading for this specific event
                    className="text-primary text-sm bg-transparent border-none hover:text-grey py-2  flex align-items-center justify-content-center cursor-pointer ml-1 md:ml-0"
                  >
                    {markingDoneById[schedule.id]
                      ? 'Marking...'
                      : 'Mark as done'}
                  </button>
                ) : (
                  <div className="text-grey">Completed</div>
                )}

                {/* See Plant Details button */}
                <button
                  className=" text-sm bg-primary border-round-lg border-solid border-primary hover:bg-primary-reverse py-3  flex align-items-center justify-content-center cursor-pointer ml-1 md:ml-0"
                  onClick={() => navigateToPlantDetails(schedule.plant_id)} // Logic to go to plant details
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
