import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import Loading from 'react-loading';
import { useDispatch } from 'react-redux';
import Select from 'react-select'; // Import react-select
import { toast } from 'react-toastify';
import { addNewPlant } from '../../features/plant/plantsSlice';

const AddPlantModal = ({ onClose, gardenId }) => {
  const [file, setFile] = useState(null);
  const [filePlantPreview, setFilePlantPreview] = useState(null);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [ageUnit, setAgeUnit] = useState('days');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [watering, setWatering] = useState(1);
  const [healthStatus, setHealthStatus] = useState('Healthy');
  const [height, setHeight] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const categories = [
    { id: 1, name: 'Vegetables' },
    { id: 2, name: 'Fruits' },
    { id: 3, name: 'Herbs' },
    { id: 4, name: 'Flowers' },
    { id: 5, name: 'Succulents' },
    { id: 6, name: 'Cacti' },
    { id: 7, name: 'Trees' },
    { id: 8, name: 'Shrubs' },
    { id: 9, name: 'Vines' },
    { id: 10, name: 'Grasses' },
    { id: 11, name: 'Aquatic Plants' },
    { id: 12, name: 'Bulbs' },
    { id: 13, name: 'Ornamental Plants' },
    { id: 14, name: 'Ferns' },
    { id: 15, name: 'Palms' },
    { id: 16, name: 'Bonsai' },
  ];

  const healthStatusOptions = [
    { value: 'Healthy', label: 'Healthy' },
    { value: 'Unhealthy', label: 'Unhealthy' },
    { value: 'Diseased', label: 'Diseased' },
    { value: 'Recovering', label: 'Recovering' },
  ];

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: 'var(--surface-0)',
      borderColor: 'var(--surface-border)',
      borderRadius: 'var(--border-radius)',
      color: 'var(--text-color)',
      fontFamily: 'Inter, sans-serif',
      fontSize: '12px',
      boxShadow: state.isFocused ? '0 0 0 1px var(--primary-color)' : null,
      '&:hover': {
        borderColor: 'var(--primary-color)',
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: 'var(--surface-0)',
      borderRadius: 'var(--border-radius)',
      zIndex: 9999,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? 'var(--primary-color)'
        : state.isFocused
        ? 'var(--tint_5)'
        : 'var(--surface-0)',
      color: state.isSelected
        ? 'var(--primary-color-text)'
        : 'var(--text-color)',
      fontFamily: 'Inter, sans-serif',
      fontSize: '14px',
      '&:hover': {
        backgroundColor: 'var(--tint_1)',
        color: 'var(--primary-color-text)',
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'var(--text-color)',
      fontFamily: 'Inter, sans-serif',
      fontSize: '14px',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: 'var(--text-color-secondary)',
      fontFamily: 'Inter, sans-serif',
      fontSize: '14px',
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: 'var(--text-color-secondary)',
      '&:hover': {
        color: 'var(--primary-color)',
      },
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    input: (provided) => ({
      ...provided,
      color: 'var(--text-color)',
      fontFamily: 'Inter, sans-serif',
      fontSize: '14px',
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: 'var(--tint_4)',
      borderRadius: 'var(--border-radius)',
      color: 'var(--text-color)',
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: 'var(--text-color)',
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: 'var(--text-color-secondary)',
      '&:hover': {
        backgroundColor: 'var(--primary-color)',
        color: 'var(--primary-color-text)',
      },
    }),
  };

  const ageOptions = [
    { value: 'days', label: 'Days' },
    { value: 'weeks', label: 'Weeks' },
    { value: 'years', label: 'Years' },
  ];

  const handlePlantFileChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log(selectedFile)
    if (selectedFile) {
      setFile(selectedFile);
      const previewURL = URL.createObjectURL(selectedFile);
      setFilePlantPreview(previewURL);
    }
  };

  const handleCategoryChange = (selectedOption) => {
    setCategory(selectedOption.label);
  };

  const handleAgeUnitChange = (selectedOption) => {
    setAgeUnit(selectedOption.value);
  };

  const handleHealthStatusChange = (selectedOption) => {
    setHealthStatus(selectedOption.value);
  };

  const convertAgeToDays = (age, unit) => {
    switch (unit) {
      case 'weeks':
        return age * 7;
      case 'years':
        return age * 365;
      default:
        return age;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('age', convertAgeToDays(age, ageUnit));
    formData.append('category', category);
    formData.append('description', description);
    formData.append('watering_frequency', watering);
    formData.append('health_status', healthStatus);
    formData.append('height', height);
    formData.append('garden_id', gardenId);
    if (file) {
      formData.append('file', file);
    }

    try {
      await dispatch(addNewPlant(formData)).unwrap();
      toast.success('Plant added successfully');
      setName('');
      setAge('');
      setAgeUnit('days');
      setCategory('');
      setDescription('');
      setWatering(1);
      setHealthStatus('Healthy');
      setHeight('');
      setFile(null);
      setFilePlantPreview(null);
      onClose();
    } catch (error) {
      toast.error('Failed to add plant');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex justify-content-center align-items-center"
      style={{ backgroundColor: 'rgba(22, 29, 33, 0.5)' }}
    >
      <div className="relative bg-white border-round-xl px-2 py-4 sm:px-6 w-11 sm:w-10 md:w-8 lg:w-8 shadow-4 overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-0 right-0 mt-3 mr-3 cursor-pointer bg-transparent border-none"
        >
          <FaTimes className="text-2xl text-secondary" />
        </button>
        <h2 className="text-center m-0">Add New Plant</h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-column mt-1 text-sm md:text-base"
        >
          <div className="flex flex-column md:flex-row  mb-3 justify-content-between">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-2 mb-3 md:mb-0 md:col-5 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary"
              placeholder="Enter plant name"
              required
            />
            <div className="flex justify-content-between w-auto sm:col-5 p-0 ">
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary"
                placeholder="Enter age"
                required
              />
              <Select
                value={ageOptions.find((option) => option.value === ageUnit)}
                onChange={handleAgeUnitChange}
                options={ageOptions}
                styles={customStyles}
                className="ml-2"
                placeholder="Select age unit"
              />
            </div>
          </div>
          <div className="flex flex-column md:flex-row justify-content-between mb-3">
            <Select
              options={categories.map((cat) => ({
                value: cat.id,
                label: cat.name,
              }))}
              onChange={handleCategoryChange}
              placeholder="Search and select category"
              styles={customStyles}
              className="md:col-5 p-0 mb-3 md:mb-0 " // Apply custom styles here
            />
            <div className="flex justify-content-between w-auto sm:col-5 p-0">
              <Select
                value={healthStatusOptions.find(
                  (option) => option.value === healthStatus
                )}
                onChange={handleHealthStatusChange}
                options={healthStatusOptions}
                styles={customStyles}
                className="w-9rem"
                placeholder="Select health status"
                required
              />{' '}
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="p-2 ml-2 w-10rem border-1 border-solid surface-border border-round"
                placeholder="Enter height in cm"
              />
            </div>
          </div>
          <div className="flex flex-column mb-3">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="p-2 w-full  border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary"
              placeholder="Enter description"
              required
              rows={2}
              style={{ fontFamily: 'inter' }}
            />
          </div>

          <div className="flex flex-column mb-4">
            <label>Watering Frequency (times per week)</label>
            <small className="mb-2 text-grey">
              Tip: 1 means once a week, 7 means every day
            </small>

            <input
              type="range"
              min="1"
              max="7"
              value={watering}
              onChange={(e) => setWatering(e.target.value)}
              required
              className="w-full"
              style={{
                appearance: 'none',
                height: '8px',
                background: `linear-gradient(to right, var(--primary-color) ${
                  ((watering - 1) / 6) * 100
                }%, var(--surface-border) ${((watering - 1) / 6) * 100}%)`,
                borderRadius: 'var(--border-radius)',
                outline: 'none',
              }}
            />

            <div className="flex justify-content-between mt-2">
              {[...Array(7)].map((_, index) => (
                <span key={index} className="text-sm text-grey">
                  {index + 1}
                </span>
              ))}
            </div>

            <style jsx>{`
              input[type='range']::-webkit-slider-thumb {
                appearance: none;
                width: 20px;
                height: 20px;
                background: var(--primary-color); /* Green thumb */
                border-radius: 50%;
                cursor: pointer;
                border: 2px solid var(--primary-color-text);
              }

              input[type='range']::-moz-range-thumb {
                background: var(--primary-color); /* Green thumb for Firefox */
                border: 2px solid var(--primary-color-text);
                border-radius: 50%;
                width: 20px;
                height: 20px;
                cursor: pointer;
              }
            `}</style>
          </div>
          <div className="flex flex-column w-full">
            <label
              htmlFor="plant-file-upload"
              className="text-center  cursor-pointer border-dotted border-2 border-primary w-full"
              style={{ padding: filePlantPreview ? '1rem' : '6rem' }} // Conditional padding
            >
              <input
                id="plant-file-upload"
                type="file"
                accept="image/*"
                onChange={handlePlantFileChange}
                className="hidden"
              />
              {filePlantPreview ? (
                <img
                  src={filePlantPreview}
                  alt="Preview"
                  className="border-round"
                  style={{ maxHeight: '200px', maxWidth: '100%' }}
                />
              ) : (
                'Drag & drop image or Browse'
              )}
            </label>
          </div>
          <button
            type="submit"
            className={`text-white border-none border-round py-2 mt-2 w-full flex justify-content-center align-items-center ${
              !name || !age || !category || !description || loading
                ? 'bg-green-400'
                : 'bg-primary cursor-pointer'
            } `}
            disabled={!name || !age || !category || !description || loading}
          >
            {loading ? (
              <Loading type="spin" color="#fff" height={20} width={20} />
            ) : (
              'Add Plant'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPlantModal;
