import React, { useState } from 'react';

const AddPlantModal = ({ onClose }) => {
  const [plantData, setPlantData] = useState({
    name: '',
    ageDays: '',
    ageMonths: '',
    ageYears: '',
    category: '',
    description: '',
    watering: '',
    height: '',
    healthStatus: '',
    image: null,
  });

  const handleInputChange = (e) => {
    setPlantData({
      ...plantData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setPlantData({
      ...plantData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = () => {
    // Handle the form submission, possibly sending data to the backend
    console.log('Plant data:', plantData);
    onClose(); // Close the modal after submission
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content border-round-xl p-6 shadow-4 w-11 sm:w-8 md:w-8 lg:w-8 bg-white">
        <button onClick={onClose} className="absolute top-0 right-0 mt-3 mr-3 cursor-pointer">
          X {/* Close button */}
        </button>
        <h2 className="text-center">Add New Plant</h2>

        <div className="grid mt-4">
          <div className="col-12 mb-3">
            <input
              type="text"
              name="name"
              placeholder="Plant Name"
              value={plantData.name}
              onChange={handleInputChange}
              className="w-full p-2"
            />
          </div>

          <div className="col-12 mb-3 flex">
            <input
              type="number"
              name="ageDays"
              placeholder="Days"
              value={plantData.ageDays}
              onChange={handleInputChange}
              className="w-full p-2 mr-2"
            />
            <input
              type="number"
              name="ageMonths"
              placeholder="Months"
              value={plantData.ageMonths}
              onChange={handleInputChange}
              className="w-full p-2 mr-2"
            />
            <input
              type="number"
              name="ageYears"
              placeholder="Years"
              value={plantData.ageYears}
              onChange={handleInputChange}
              className="w-full p-2"
            />
          </div>

          <div className="col-12 mb-3">
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={plantData.category}
              onChange={handleInputChange}
              className="w-full p-2"
            />
          </div>

          <div className="col-12 mb-3">
            <textarea
              name="description"
              placeholder="Description"
              value={plantData.description}
              onChange={handleInputChange}
              className="w-full p-2"
            />
          </div>

          <div className="col-6 mb-3">
            <input
              type="text"
              name="watering"
              placeholder="Watering Frequency"
              value={plantData.watering}
              onChange={handleInputChange}
              className="w-full p-2"
            />
          </div>

          <div className="col-6 mb-3">
            <input
              type="text"
              name="height"
              placeholder="Height"
              value={plantData.height}
              onChange={handleInputChange}
              className="w-full p-2"
            />
          </div>

          <div className="col-12 mb-3">
            <input
              type="text"
              name="healthStatus"
              placeholder="Health Status"
              value={plantData.healthStatus}
              onChange={handleInputChange}
              className="w-full p-2"
            />
          </div>

          <div className="col-12 mb-3">
            <label>Upload Image (optional)</label>
            <input
              type="file"
              name="image"
              accept=".jpg,.png,.jpeg,.pdf"
              onChange={handleFileChange}
              className="w-full p-2"
            />
          </div>
        </div>

        <div className="flex justify-content-center mt-4">
          <button onClick={handleSubmit} className="p-button p-component">
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPlantModal;
