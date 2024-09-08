import React, { useEffect, useState } from 'react';
import Loading from 'react-loading';
import { useDispatch, useSelector } from 'react-redux';
import GardenNav from '../components/Gardens/GardenNav';
import PlantCard from '../components/Gardens/PlantCard';
import { clearGardens, fetchGardens } from '../features/garden/gardensSlice'; // Fetch gardens action
import {
  clearPlants,
  fetchPlantsByGarden,
} from '../features/plant/plantsSlice';

const MyGardensPage = () => {
  const dispatch = useDispatch();
  const [selectedGardenId, setSelectedGardenId] = useState(null); // State for selected garden

  const gardens = useSelector((state) => state.gardens.gardens || []);
  const gardenLoading = useSelector((state) => state.gardens.loading);

  const plants = useSelector((state) => state.plants.plants || []); // Safe access to plants state
  const plantLoading = useSelector((state) => state.plants.loading);

  // Fetch gardens when the page loads
  useEffect(() => {
    dispatch(fetchGardens());

    return () => {
      dispatch(clearGardens()); // Clear gardens when component unmounts
    };
  }, [dispatch]);

  // Fetch plants for the selected garden
  useEffect(() => {
    if (selectedGardenId) {
      dispatch(clearPlants()); // Clear plants when switching gardens
      dispatch(fetchPlantsByGarden(selectedGardenId)); // Fetch plants for the selected garden
    }
  }, [selectedGardenId, dispatch]);

  return (
    <div className="grid m-0">
      {/* Left side Garden Navigation */}
      <div className="col-3 p-0 bg-tint-5">
        {gardenLoading ? (
          <p>Loading gardens...</p>
        ) : (
          <GardenNav
            gardens={gardens}
            selectedGardenId={selectedGardenId}
            onSelectGarden={setSelectedGardenId} // Set selected garden ID when a garden is clicked
          />
        )}
      </div>

      {/* Right side Plant List */}
      <div className="col-9">
        <div className="grid m-0">
          {plantLoading ? (
            <div className="loading h-20rem flex align-items-center justify-content-center">
              <Loading type="spin" color="#019444" height={50} width={50} />
            </div>
          ) : plants.length > 0 ? (
            plants.map((plant) => (
              <div className="col-12 sm:col-6 md:col-4 lg:col-3" key={plant.id}>
                <PlantCard plant={plant} />
              </div>
            ))
          ) : (
            <p>No plants found in this garden...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyGardensPage;
