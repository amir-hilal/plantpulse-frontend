import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addGarden } from '../../features/garden/gardensSlice'; // Action to handle form submission

const AddGardenModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [file, setFile] = useState(null);

  // Handle file change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    if (file) {
      formData.append('file', file);
    }
    // Dispatch the form data to the Redux action
    dispatch(addGarden(formData));
    onClose(); // Close the modal after submission
  };

  return (
    <div className="grid justify-content-center align-items-center">
      <div className="flex flex-column">
        <button onClick={onClose} className="self-end">
          &times;
        </button>
        <h3>Add new Garden</h3>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-column">
            <label htmlFor="name">Garden Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-column mt-2">
            <label htmlFor="file">Garden Image (optional)</label>
            <input
              type="file"
              id="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          <div className="flex justify-content-center mt-3">
            <button type="submit" className="mt-2">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGardenModal;
