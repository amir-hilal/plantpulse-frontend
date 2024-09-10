import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import Loading from 'react-loading';

const AddPlantModal = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [filePreview, setFilePreview] = useState(null);

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
    const { name, value } = e.target;

    const limits = {
      ageDays: 7,
      ageWeeks: 52,
      watering: { min: 1, max: 7 },
    };

    // Handle limits for ageDays and ageWeeks
    if (name === 'ageDays' || name === 'ageWeeks') {
      setPlantData({
        ...plantData,
        [name]: value > limits[name] ? limits[name] : value,
      });
    }
    // Handle limits for watering
    else if (name === 'watering') {
      setPlantData({
        ...plantData,
        [name]:
          value < limits.watering.min
            ? limits.watering.min
            : value > limits.watering.max
            ? limits.watering.max
            : value,
      });
    }
    // Handle other cases without limits
    else {
      setPlantData({
        ...plantData,
        [name]: value,
      });
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const previewURL = URL.createObjectURL(selectedFile);
      setFilePreview(previewURL);
      setPlantData({
        ...plantData,
        image: e.target.files[0],
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log('Plant data:', plantData);
    onClose();
    setLoading(false); // Close the modal after submission
  };
  const isFormValid = () => {
    const { name, ageDays, category, watering, healthStatus } = plantData;
    return name && ageDays && category && watering && healthStatus && !loading;
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

        <form
          onSubmit={handleSubmit}
          className="formgrid  grid ml-0 mr-0 w-full"
        >
          <div className="flex justify-content-between w-full">
            <div className="field col-3  flex flex-column p-0 ">
              <label htmlFor="age">Plant Name</label>

              <input
                type="text"
                name="name"
                placeholder="Name"
                value={plantData.name}
                onChange={handleInputChange}
                className="p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary"
              />
            </div>

            <div className="field col-4  flex p-0  flex-column">
              <label htmlFor="age" className="pl-2">
                Age
              </label>
              <div className="flex pl-2 pr-2 justify-content-between">
                <input
                  type="number"
                  name="ageDays"
                  placeholder="Days"
                  value={plantData.ageDays}
                  onChange={handleInputChange}
                  className="w-5rem p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary "
                  min="0"
                  max="6" // Limiting days to 6
                />
                <input
                  type="number"
                  name="ageWeeks"
                  placeholder="Weeks"
                  value={plantData.ageWeeks}
                  onChange={handleInputChange}
                  className="w-5rem p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary "
                  min="0"
                  max="51" // Limiting weeks to 51
                />
                <input
                  type="number"
                  name="ageYears"
                  placeholder="Years"
                  value={plantData.ageYears}
                  onChange={handleInputChange}
                  className="w-5rem p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="field col-3 flex flex-column p-0 ">
              <label htmlFor="category">Category</label>

              <input
                type="text"
                name="category"
                placeholder="Category"
                value={plantData.category}
                onChange={handleInputChange}
                className="p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary"
              />
            </div>
          </div>
          {/*  */}

          <div className="flex flex-column w-full mb-3">
            <textarea
              rows={6}
              type="text"
              name="descirption"
              placeholder="Descirption..."
              value={plantData.description}
              onChange={handleInputChange}
              className="p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary"
            />
          </div>

          <div className="flex justify-content-between w-full mb-3">
            <div className="col-6  p-0 pr-2">
              <input
                type="number"
                name="watering"
                placeholder="Watering Frequency (per week, 1-7)"
                value={plantData.watering}
                onChange={handleInputChange}
                className="p-2 w-full border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary"
                min="1"
                max="7" // Limiting days to 6
              />
            </div>

            <div className="col-6  p-0 pl-2">
              <input
                type="text"
                name="height"
                placeholder="Height"
                value={plantData.height}
                onChange={handleInputChange}
                className="p-2 w-full border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary"
              />
            </div>
          </div>
          <div className="flex justify-content-between w-full mb-3">
            <div className="col-12 mb-3 p-0">
              <input
                type="text"
                name="healthStatus"
                placeholder="Health Status"
                value={plantData.healthStatus}
                onChange={handleInputChange}
                className="p-2 w-full border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="flex flex-column mb-1">
            <div className="flex flex-column align-items-center">
              <label
                htmlFor="file-upload"
                className="text-center cursor-pointer border-dotted border-2 border-primary w-full"
                style={{ padding: filePreview ? '1rem' : '7rem' }} // Conditional padding
              >
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                {filePreview ? (
                  <img
                    src={filePreview}
                    alt="Preview"
                    className="border-round"
                    style={{ maxHeight: '200px', maxWidth: '100%' }} // Limit height and width
                  />
                ) : (
                  'Drag & drop files or Browse'
                )}
              </label>
              <small className="text-center mt-2">
                Supported formats: JPEG, PNG, JPG, GIF
              </small>
            </div>
          </div>
        </form>

        <div className="flex justify-content-center mt-4">
          <button
            type="submit"
            className={` text-white border-none border-round py-2 mt-2 w-full flex justify-content-center align-items-center ${
              !isFormValid() ? 'bg-green-300' : 'bg-primary cursor-pointer'
            } `}
            disabled={!isFormValid()}
          >
            {loading ? (
              <Loading type="spin" color="#fff" height={20} width={20} />
            ) : (
              'Add'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPlantModal;
