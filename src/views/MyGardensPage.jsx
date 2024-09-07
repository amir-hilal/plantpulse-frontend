import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PlantCard from '../components/PlantCard';
import {
  clearPlants,
  fetchPlantsByGarden,
} from '../features/plant/plantsSlice';

const MyGardensPage = () => {
  const [activeGarden, setActiveGarden] = useState(null); // Currently selected garden
  const dispatch = useDispatch();
  const plants = useSelector((state) => state.plants.plants); // Plants in the garden

  const gardens = [
    // Placeholder for gardens, will be fetched from API later
    { id: 1, name: 'Backyard' },
    { id: 2, name: 'Living Room' },
    { id: 3, name: 'Patio' },
  ];

  useEffect(() => {
    if (activeGarden) {
      dispatch(clearPlants()); // Clear state when switching gardens
      dispatch(fetchPlantsByGarden(activeGarden.id)); // Fetch new garden plants
    }
  }, [activeGarden, dispatch]);

  return (
    <div className="p-grid">
      {/* Left Navigation */}
      <div className="p-col-2 hidden-sm hidden-xs">
        <div className="p-mt-3 p-d-flex p-flex-column">
          <button
            className="p-button p-my-2"
            onClick={() => setActiveGarden(null)}
          >
            + Add New Garden
          </button>
          {gardens.map((garden) => (
            <button
              key={garden.id}
              className={`p-button p-my-2 ${
                activeGarden && activeGarden.id === garden.id
                  ? 'p-button-primary'
                  : ''
              }`}
              onClick={() => setActiveGarden(garden)}
            >
              {garden.name}
            </button>
          ))}
        </div>
      </div>

      {/* Plant Cards */}
      <div className="p-col-10">
        <div className="p-grid p-jc-center">
          {plants.length === 0 ? (
            <p>No plants found in this garden.</p>
          ) : (
            plants.map((plant) => <PlantCard key={plant.id} plant={plant} />)
          )}
          {/* Add New Plant */}
          <div className="p-col-12 p-md-4 p-lg-3">
            <div className="p-shadow-3 p-p-3 p-mb-4 p-border-round">
              <p className="p-text-center">+ Add New Plant</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyGardensPage;
