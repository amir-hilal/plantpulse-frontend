import React, { useEffect, useState } from 'react';
import { MdEdit } from 'react-icons/md';
import Loading from 'react-loading';
import { useDispatch, useSelector } from 'react-redux';
import AddPlantModal from '../components/Gardens/AddPlantModal';
import GardenNav from '../components/Gardens/GardenNav';
import PlantCard from '../components/Gardens/PlantCard';
import TimelineModal from '../components/Gardens/TimelineModal';
import {
  clearGardens,
  fetchGardens,
  updateGardenImage,
} from '../features/garden/gardensSlice';
import { clearPlants, fetchPlants } from '../features/plant/plantsSlice';
import AddGardenModal from '../components/Gardens/AddGardenModal';
const MyGardensPage = () => {
  const dispatch = useDispatch();
  const [selectedGardenId, setSelectedGardenId] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isPlantModalOpen, setPlantModalOpen] = useState(false);
  const [editingGarden, setEditingGarden] = useState(null); // Track if we are editing a garden
  const [selectedFile, setSelectedFile] = useState(null);
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

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    if (selectedFile) {
      dispatch(updateGardenImage({ id: selectedGardenId, file: selectedFile }));
    }
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
            <>
              <div className="col-12 sm:col-6 lg:col-4 xl:col-3 aspect-ratio-10-16">
                <div
                  className="surface-card shadow-2 border-round-lg p-3 flex align-items-center justify-content-center text-center cursor-pointer mb-2"
                  onClick={() => setPlantModalOpen(true)} // This will open the modal
                  style={{ height: '50%' }}
                >
                  <span className="text-2xl font-bold">+ Add New Plant</span>
                </div>

                {/* Garden Image with Edit Hover */}
                <div className="relative group">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <div className="relative">
                      {/* Check if image_url exists, if not show a gray placeholder */}
                      {gardens[selectedGardenId].image_url ? (
                        <img
                          src={gardens[selectedGardenId].image_url}
                          alt="garden"
                          className="surface-card shadow-2 border-round-lg w-full mt-2 group-hover:blur-sm"
                        />
                      ) : (
                        <div className="w-full h-48 surface-card shadow-2 border-round-lg bg-gray-200 flex align-items-center justify-content-center">
                          <span className="text-gray-500">
                            No Image Available
                          </span>
                        </div>
                      )}

                      {/* Edit icon, shown on hover */}
                      <div className="absolute top-0 left-0 w-full h-full flex align-items-center justify-content-center opacity-0 edit-icon">
                        <MdEdit className="text-black text-3xl" />
                      </div>
                    </div>
                  </label>

                  {/* Hidden file input */}
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden" // Hide the input field
                  />
                </div>
              </div>
              {/* Render each plant as a card */}
              {plants.map((plant) => (
                <div
                  className="col-12 sm:col-6 lg:col-4 xl:col-3 aspect-ratio-10-16"
                  key={plant.id}
                >
                  <PlantCard plant={plant} />
                </div>
              ))}

              {/* Add New Plant Button, styled as a card */}
            </>
          ) : (
            <p className="w-full">No plants found in this garden...</p>
          )}
        </div>

        {/* Add Plant Modal */}
        {isPlantModalOpen && <AddPlantModal onClose={() => setPlantModalOpen(false)} />}
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
