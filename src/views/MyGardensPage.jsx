import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GardenNav from '../components/common/GardenNav';
import PlantCard from '../components/common/PlantCard';
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
    <div className="p-grid">
      {/* Left side Garden Navigation */}
      <div className="p-col-3">
        <GardenNav
          gardens={gardens}
          selectedGardenId={selectedGardenId}
          onSelectGarden={setSelectedGardenId} // Set selected garden ID when a garden is clicked
        />
      </div>

      {/* Right side Plant List */}
      <div className="p-col-9">
        <div className="p-grid">
          {loading ? (
            <p>Loading plants...</p>
          ) : plants.length > 0 ? (
            plants.map((plant) => <PlantCard key={plant.id} plant={plant} />)
          ) : (
            <p>No plants found in this garden...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyGardensPage;
