import React, { useEffect, useState } from 'react';
import Loading from 'react-loading';
import { useDispatch, useSelector } from 'react-redux';
import AddGardenModal from '../components/Gardens/AddGardenModal';
import GardenNav from '../components/Gardens/GardenNav';
import PlantCard from '../components/Gardens/PlantCard';
import { clearGardens, fetchGardens } from '../features/garden/gardensSlice';
import {
  clearPlants,
  fetchPlantsByGarden,
} from '../features/plant/plantsSlice';

const MyGardensPage = () => {
  const dispatch = useDispatch();
  const [selectedGardenId, setSelectedGardenId] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false); // State to control modal visibility

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
      dispatch(fetchPlantsByGarden(selectedGardenId));
    }
  }, [selectedGardenId, dispatch]);

  return (
    <div className="grid m-0">
      <div className="col-3 p-0 bg-tint-5">
        {gardenLoading ? (
          <div className="loading h-20rem flex align-items-center justify-content-center">
            <Loading type="spin" color="#019444" height={50} width={50} />
          </div>
        ) : (
          <GardenNav
            gardens={gardens}
            selectedGardenId={selectedGardenId}
            onSelectGarden={setSelectedGardenId}
            onAddGarden={() => setModalOpen(true)}
          />
        )}
      </div>

      <div className="col-9">
        <div className="grid m-0">
          {plantLoading ? (
            <div className="loading h-30rem w-full flex align-items-center justify-content-center">
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

      {/* Add Garden Modal */}
      {isModalOpen && <AddGardenModal onClose={() => setModalOpen(false)} />}
    </div>
  );
};

export default MyGardensPage;
