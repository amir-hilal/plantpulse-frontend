import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

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
    <div
      className="fixed top-0 left-0 w-full h-full flex justify-content-center align-items-center"
      style={{ backgroundColor: 'rgba(22, 29, 33, 0.5)' }}
    >
      <div className="relative bg-white border-round-xl p-6 w-11 sm:w-8 md:w-8 lg:w-8 shadow-4 overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-0 right-0 mt-3 mr-3 cursor-pointer bg-transparent border-none"
        >
          <FaTimes className="text-2xl text-secondary" />
        </button>
        <h2 className="text-center">Add New Plant</h2>

        <div className="formgrid grid ml-0 mr-0">
          <div className="flex justify-content-between">
            <div className="field col-4 md:col-3 flex flex-column p-0 md:pr-1">
              <label htmlFor="age">Plant</label>

              <input
                type="text"
                name="name"
                placeholder="Name"
                value={plantData.name}
                onChange={handleInputChange}
                className="p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary"
              />
            </div>

            <div className="field col-4 md:col-3 flex  p-0 md:pl-1  flex-column">
              <label htmlFor="age">Age</label>
              <div className="flex">
                <input
                  type="number"
                  name="ageDays"
                  placeholder="Days"
                  value={plantData.ageDays}
                  onChange={handleInputChange}
                  className="col-4 p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primarymr-1"
                />
                <input
                  type="number"
                  name="ageMonths"
                  placeholder="Months"
                  value={plantData.ageMonths}
                  onChange={handleInputChange}
                  className="col-4 p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary mr-1"
                />
                <input
                  type="number"
                  name="ageYears"
                  placeholder="Years"
                  value={plantData.ageYears}
                  onChange={handleInputChange}
                  className="col-4 p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="field col-4 md:col-3 flex flex-column p-0 md:pr-1">
              <label htmlFor="category">Category</label>

              <input
                type="text"
                name="name"
                placeholder="Name"
                value={plantData.name}
                onChange={handleInputChange}
                className="p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary"
              />
            </div>
          </div>
          {/*  */}

          <div className='flex flex-column w-full'>
              <label htmlFor="category">Description</label>

            <textarea
              cols={10}
                type="text"
                name="descirption"
                placeholder="Descirption..."
                value={plantData.description}
                onChange={handleInputChange}
                className="p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary"
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
