import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addGarden } from '../../features/garden/gardensSlice'; // Action to handle form submission
import Loading from 'react-loading';

const AddGardenModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle file change
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const previewURL = URL.createObjectURL(selectedFile);
      setFilePreview(previewURL);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    const formData = new FormData();
    formData.append('name', name);
    if (file) {
      formData.append('file', file);
    }
    // Dispatch the form data to the Redux action
    dispatch(addGarden(formData));
    setName('');
    setFile(null);
    setFilePreview(null);
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
        <h3>Add new Garden</h3>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-column mb-4">
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary"
              placeholder="Enter Garden Name"
              required
            />
          </div>
          <div className="flex flex-column mt-2">
            <div className="flex flex-column align-items-center">
              <label
                htmlFor="file-upload"
                className="text-center cursor-pointer border-dotted border-2 border-primary"
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
          <button
            type="submit"
            className={` text-white border-none border-round py-2 mt-2 w-full flex justify-content-center align-items-center ${
              !name || loading
                ? 'bg-green-400'
                : 'bg-primary cursor-pointer'
            } `}
            disabled={!name || loading}
          >
            {loading ? (
              <Loading type="spin" color="#fff" height={20} width={20} />
            ) : (
              'Add'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddGardenModal;
