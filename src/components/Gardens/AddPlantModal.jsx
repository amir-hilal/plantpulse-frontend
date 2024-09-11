import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import Loading from 'react-loading';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addNewPlant } from '../../features/plant/plantsSlice';

const AddPlantModal = ({ isOpen, onClose, categories }) => {
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
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

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const previewURL = URL.createObjectURL(selectedFile);
      setFilePreview(previewURL);
    }
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
    formData.append('watering', watering);
    formData.append('health_status', healthStatus);
    formData.append('height', height);
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
      setFilePreview(null);
      onClose();
    } catch (error) {
      toast.error('Failed to add plant');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex justify-content-center align-items-center"
      style={{ backgroundColor: 'rgba(22, 29, 33, 0.5)' }}
    >
      <div className="relative bg-white border-round-xl p-6 w-9 sm:w-8 md:w-8 lg:w-8 shadow-4 overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-0 right-0 mt-3 mr-3 cursor-pointer bg-transparent border-none"
        >
          <FaTimes className="text-2xl text-secondary" />
        </button>
        <h2 className="text-center m-0">Add New Plant</h2>
        <form onSubmit={handleSubmit} className="flex flex-column mt-1">
          <div className="flex flex-column mb-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary"
              placeholder="Enter plant name"
              required
            />
          </div>
          <div className="flex mb-4">
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="p-2 border-1 border-solid surface-border border-round"
              placeholder="Enter age"
              required
            />
            <select
              value={ageUnit}
              onChange={(e) => setAgeUnit(e.target.value)}
              className="ml-2 p-2 border-1 border-solid surface-border border-round"
            >
              <option value="days">Days</option>
              <option value="weeks">Weeks</option>
              <option value="years">Years</option>
            </select>
          </div>
          <div className="flex flex-column mb-4">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="p-2 border-1 border-solid surface-border border-round"
              required
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option value={cat.id} key={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-column mb-4">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="p-2 border-1 border-solid surface-border border-round"
              placeholder="Enter description"
              required
            />
          </div>
          <div className="flex flex-column mb-4">
            <label>Watering Frequency (times per week)</label>
            <input
              type="range"
              min="1"
              max="7"
              value={watering}
              onChange={(e) => setWatering(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-column mb-4">
            <select
              value={healthStatus}
              onChange={(e) => setHealthStatus(e.target.value)}
              className="p-2 border-1 border-solid surface-border border-round"
              required
            >
              <option value="Healthy">Healthy</option>
              <option value="Unhealthy">Unhealthy</option>
              <option value="Diseased">Diseased</option>
              <option value="Recovering">Recovering</option>
            </select>
          </div>
          <div className="flex flex-column mb-4">
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="p-2 border-1 border-solid surface-border border-round"
              placeholder="Enter height in cm"
            />
          </div>
          <div className="flex flex-column w-full">
            <label
              htmlFor="file-upload"
              className="text-center  cursor-pointer border-dotted border-2 border-primary w-full"
              style={{ padding: filePreview ? '1rem' : '6rem' }} // Conditional padding
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
