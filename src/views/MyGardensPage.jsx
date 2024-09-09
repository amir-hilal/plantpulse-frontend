import React, { useEffect, useState } from 'react';
import Loading from 'react-loading';
import { useDispatch, useSelector } from 'react-redux';
import AddGardenModal from '../components/Gardens/AddGardenModal';
import GardenNav from '../components/Gardens/GardenNav';
import PlantCard from '../components/Gardens/PlantCard';
import TimelineModal from '../components/Gardens/TimelineModal';
import { clearGardens, fetchGardens } from '../features/garden/gardensSlice';
import { clearPlants, fetchPlants } from '../features/plant/plantsSlice';

const MyGardensPage = () => {
  const dispatch = useDispatch();
  const [selectedGardenId, setSelectedGardenId] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingGarden, setEditingGarden] = useState(null); // Track if we are editing a garden

  const gardens = useSelector((state) => state.gardens.gardens || []);
  const gardenLoading = useSelector((state) => state.gardens.loading);
  const plants = useSelector((state) => state.plants.plants || []);
  const plantLoading = useSelector((state) => state.plants.loading);

  useEffect(() => {
    dispatch(fetchGardens());

    return () => {
      dispatch(clearGardens());
    };
  }, [dispatch]);

  useEffect(() => {
    if (selectedGardenId) {
      dispatch(clearPlants());
      dispatch(fetchPlants(selectedGardenId));
    }
  }, [selectedGardenId, dispatch]);

  const handleEditGarden = (garden) => {
    setEditingGarden(garden);
    setModalOpen(true);
  };

  return (
    <div className="flex">
      <div className="col-3 p-0 bg-tint-5 min-w-5">
        {gardenLoading ? (
          <div className="loading h-screen flex align-items-center justify-content-center">
            <Loading type="spin" color="#019444" height={50} width={50} />
          </div>
        ) : (
          <GardenNav
            gardens={gardens}
            selectedGardenId={selectedGardenId}
            onSelectGarden={setSelectedGardenId}
            onAddGarden={() => {
              setEditingGarden(null);
              setModalOpen(true);
            }}
            onEditGarden={handleEditGarden}
          />
        )}
      </div>

      <div className="sm:col-9">
        <div className="grid m-0">
          {plantLoading ? (
            <div className="loading h-screen w-full flex align-items-center justify-content-center">
              <Loading type="spin" color="#019444" height={50} width={50} />
            </div>
          ) : plants.length > 0 ? (
            plants.map((plant) => (
              <div
                className="col-12 sm:col-6 lg:col-4 xl:col-3 aspect-ratio-10-16"
                key={plant.id}
              >
                <PlantCard plant={plant} />
              </div>
            ))
          ) : (
            <p className="w-full">No plants found in this garden...</p>
          )}
        </div>
      </div>

      {/* Add Garden Modal */}
      {isModalOpen && (
        <AddGardenModal
          onClose={() => setModalOpen(false)}
          garden={editingGarden}
        />
      )}
      <TimelineModal />
    </div>
  );
};

export default MyGardensPage;
