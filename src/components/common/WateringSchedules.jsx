import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import watringIcon from '../../assets/svg/Icons/watering.svg';
import { fetchWateringSchedules } from '../../features/watering/wateringSlice';
const WateringSchedules = () => {
  const dispatch = useDispatch();

  const { schedules, loading, error } = useSelector((state) => state.watering);

  useEffect(() => {
    dispatch(fetchWateringSchedules());
  }, [dispatch]);

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
                  backgroundColor: '#F0F9F4',
                  width: '200px',
                  textAlign: 'center',
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
                    onClick={() => alert('done')}
                    className="text-primary text-sm bg-transparent border-none hover:text-grey py-2  flex align-items-center justify-content-center cursor-pointer ml-1 md:ml-0"
                  >
                    Mark as done
                  </button>
                ) : (
                  <div className="text-grey mb-2">Completed</div>
                )}

                {/* See Plant Details button */}
                <button
                  className=" text-sm bg-primary border-round-lg border-solid border-primary hover:bg-primary-reverse py-3  flex align-items-center justify-content-center cursor-pointer ml-1 md:ml-0"

                  // onClick={() => navigateToPlantDetails(schedule.id)} // Logic to go to plant details
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
