import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import Loading from 'react-loading';
import { useDispatch } from 'react-redux';
import { addGarden, updateGarden } from '../../features/garden/gardensSlice'; // Action to handle form submission

const AddGardenModal = ({ onClose, garden }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  // const [file, setFile] = useState(null);
  // const [filePreview, setFilePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (garden) {
      setName(garden.name); // Set the name if editing
      if (garden.image) {
        // setFilePreview(garden.image); // Assuming the garden has an image field
      }
    } else {
      setName('');
      // setFilePreview(null);
    }
  }, [garden]);

  // Handle file change
  // const handleFileChange = (e) => {
  //   const selectedFile = e.target.files[0];
  //   if (selectedFile) {
  //     setFile(selectedFile);
  //     const previewURL = URL.createObjectURL(selectedFile);
  //     setFilePreview(previewURL);
  //   }
  // };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    const formData = new FormData();
    formData.append('name', name);
    // if (file) {
    //   formData.append('file', file);
    // }

    if (garden) {
      dispatch(updateGarden({ id: garden.id, formData }));
    } else {
      dispatch(addGarden(formData));
    }

    setLoading(false);
    onClose();
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex justify-content-center align-items-center"
      style={{ backgroundColor: 'rgba(22, 29, 33, 0.5)' }}
    >
      <div className="relative bg-white border-round-xl p-6   shadow-4 overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-0 right-0 mt-3 mr-3 cursor-pointer bg-transparent border-none"
        >
          <FaTimes className="text-2xl text-secondary" />
        </button>
        <h3>{garden ? 'Edit Garden' : 'Add new Garden'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-column mb-4">
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-2 border-1 border-solid bg-tint-5 border-round-lg border-400 appearance-none outline-none focus:border-primary"
              placeholder="Enter Garden Name"
              required
            />
          </div>
          {/* <div className="flex flex-column mt-2">
            <div className="flex flex-column align-items-center">
              <label
                htmlFor="file-upload"
                className="text-center cursor-pointer border-dotted border-2 border-primary"
                style={{ padding: filePreview ? '1rem' : '7rem' }}
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
                  'Drag & drop files or Browse'
                )}
              </label>
              <small className="text-center mt-2">
                Supported formats: JPEG, PNG, JPG, GIF
              </small>
            </div>
          </div> */}
          <button
            type="submit"
            className={`text-white border-none border-round py-2 mt-2 w-full flex justify-content-center align-items-center ${
              !name || loading ? 'bg-green-400' : 'bg-primary cursor-pointer'
            }`}
            disabled={!name || loading}
          >
            {loading ? (
              <Loading type="spin" color="#fff" height={20} width={20} />
            ) : garden ? (
              'Save'
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
