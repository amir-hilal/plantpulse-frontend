import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GardenNav from '../components/Gardens/GardenNav';
import PlantCard from '../components/Gardens/PlantCard';
import {
  clearPlants,
  fetchPlantsByGarden,
} from '../features/plant/plantsSlice';

const MyGardensPage = () => {
  const dispatch = useDispatch();
  const [selectedGardenId, setSelectedGardenId] = useState(null); // State for selected garden
  const plants = useSelector((state) => state.plants.plants || []); // Safe access to plants state
  const loading = useSelector((state) => state.plants.loading);

  // Assuming gardens will be fetched from the backend
  const gardens = [
    { id: 1, name: 'Backyard' },
    { id: 2, name: 'Living Room' },
    { id: 3, name: 'Balcony' },
  ];

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
        <GardenNav
          gardens={gardens}
          selectedGardenId={selectedGardenId}
          onSelectGarden={setSelectedGardenId} // Set selected garden ID when a garden is clicked
        />
      </div>

      {/* Right side Plant List */}
      <div className="col-9">
        <div className="grid m-0">
          {loading ? (
            <p>Loading plants...</p>
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
