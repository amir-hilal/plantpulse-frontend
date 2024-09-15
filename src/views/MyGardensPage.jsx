import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { MdEdit } from 'react-icons/md';
import Loading from 'react-loading';
import { useDispatch, useSelector } from 'react-redux';
import AddGardenModal from '../components/Gardens/AddGardenModal';
import AddPlantModal from '../components/Gardens/AddPlantModal';
import GardenNav from '../components/Gardens/GardenNav';
import PlantCard from '../components/Gardens/PlantCard';
import {
  clearGardens,
  fetchGardens,
  updateGardenImage,
} from '../features/garden/gardensSlice';
import { clearPlants, fetchPlants } from '../features/plant/plantsSlice';

const MyGardensPage = () => {
  const dispatch = useDispatch();
  const [selectedGardenId, setSelectedGardenId] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isPlantModalOpen, setPlantModalOpen] = useState(false);
  const [editingGarden, setEditingGarden] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const gardens = useSelector((state) => state.gardens.gardens || []);
  const gardenLoading = useSelector((state) => state.gardens.loading);
  const plants = useSelector((state) => state.plants.plants || []);
  const plantLoading = useSelector((state) => state.plants.loading);
  const selectedGarden = gardens.find(
    (garden) => garden.id === selectedGardenId
  );
  const [isUploadingImage, setIsUploadingImage] = useState(false); // Image uploading state

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
    const file = e.target.files[0];
    setSelectedFile(file);

    if (selectedFile) {
      setIsUploadingImage(true);
      dispatch(updateGardenImage({ id: selectedGardenId, file }))
        .unwrap()
        .then(() => {
          setIsUploadingImage(false);
        })
        .catch(() => {
          setIsUploadingImage(false);
        });
    }
  };

  return (
    <div className="flex">
      <div className="col-2 p-0 bg-tint-5 min-w-5">
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

      <div className="sm:col-10 p-4">
        {!selectedGardenId ? (
          <div className="h-full flex align-items-center justify-content-center">
            <p className="text-lg font-bold">Select a garden to manage</p>
          </div>
        ) : (
          <div className="grid w-full">
            {plantLoading ? (
              <div className="loading h-screen w-full flex align-items-center justify-content-center">
                <Loading type="spin" color="#019444" height={50} width={50} />
              </div>
            ) : (
              <>
                <div className="col-12 sm:col-6 lg:col-4 xl:col-3 aspect-ratio-10-16 p-4">
                  <div className="relative group" style={{ height: '50%' }}>
                    {selectedGarden ? (
                      <>
                        <label
                          htmlFor="garden-file-upload"
                          className="cursor-pointer"
                        >
                          <div className="relative w-full h-full surface-card shadow-1 border-round-2xl bg-gray-200 flex align-items-center justify-content-center">
                            {/* Display loading circle while uploading */}
                            {isUploadingImage ? (
                              <Loading
                                type="spin"
                                color="#019444"
                                height={50}
                                width={50}
                              />
                            ) : selectedGarden.image_url ? (
                              <img
                                src={selectedGarden.image_url}
                                alt="garden"
                                className="border-round-2xl w-full h-full blurry"
                              />
                            ) : (
                              <span className="text-gray-500 blurry">
                                No Garden Image
                              </span>
                            )}

                            {/* Edit icon, shown on hover */}
                            <div className="absolute w-full h-full top-0 left-0 flex align-items-center justify-content-center opacity-0 edit-icon">
                              {!isUploadingImage && (
                                <MdEdit className="text-secondary text-3xl" />
                              )}
                            </div>
                          </div>
                        </label>

                        {/* Hidden file input */}
                        <input
                          id="garden-file-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden w-full h-full" // Hide the input field
                        />
                      </>
                    ) : (
                      <div className="w-full h-full surface-card shadow-1 border-round-2xl bg-gray-200 flex align-items-center justify-content-center">
                        <label
                          htmlFor="garden-file-upload"
                          className="cursor-pointer"
                        >
                          <div className="relative">
                            <span className="text-gray-500 blurry">
                              No Garden Image
                            </span>

                            {/* Edit icon, shown on hover */}
                            <div className="absolute top-0 left-0 w-full h-full flex align-items-center justify-content-center opacity-0 edit-icon">
                              <MdEdit className="text-primary text-3xl" />
                            </div>
                          </div>
                        </label>

                        {/* Hidden file input */}
                        <input
                          id="garden-file-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden" // Hide the input field
                        />
                      </div>
                    )}
                  </div>
                  <div
                    className="shadow-1 border-round-2xl p-3 flex align-items-center justify-content-center text-center cursor-pointer mt-2 surface-300"
                    onClick={() => setPlantModalOpen(true)} // This will open the modal
                    style={{ height: '50%' }}
                  >
                    <span className="text-xl text-secondary flex flex-column justify-content-center align-items-center">
                      <FaPlus className="mb-3 text-2xl" />
                      Add New Plant
                    </span>
                  </div>
                </div>

                {/* Conditional rendering for plants */}
                {plants.length > 0 ? (
                  plants.map((plant) => (
                    <div
                      className="col-12 sm:col-6 lg:col-4 xl:col-3 aspect-ratio-10-16 p-4"
                      key={plant.id}
                    >
                      <PlantCard plant={plant} />
                    </div>
                  ))
                ) : (
                  <div className="col-12 sm:col-6 lg:col-4 xl:col-3 aspect-ratio-10-16 p-4">
                    {' '}
                    <p>No plants yet... Add plants into you garden.</p>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Add Plant Modal */}
        {isPlantModalOpen && (
          <AddPlantModal
            onClose={() => setPlantModalOpen(false)}
            gardenId={selectedGardenId}
          />
        )}
      </div>

      {/* Add Garden Modal */}
      {isModalOpen && (
        <AddGardenModal
          onClose={() => setModalOpen(false)}
          garden={editingGarden}
        />
      )}
    </div>
  );
};

export default MyGardensPage;
