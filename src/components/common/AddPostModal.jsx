import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import api from '../../services/api';

const AddPostModal = ({ isOpen, onClose }) => {
  const [file, setFile] = useState(null);
  const [content, setContent] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    }
    formData.append('content', content);

    try {
      const response = await api.post('/posts', formData);
      if (response.status === 201) {
        toast.success('Post created successfully');
        onClose();
        // Handle post creation success, possibly refetch posts or update state
      }
    } catch (error) {
      toast.error('Failed to create post');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-content-center align-items-center" style={{ backgroundColor: 'rgba(22, 29, 33, 0.5)' }}>
      <div className="relative bg-white border-round-xl p-6 w-11 sm:w-8 md:w-8 lg:w-8 shadow-4 overflow-hidden">
        <button onClick={onClose} className="absolute top-0 right-0 mt-3 mr-3 cursor-pointer bg-transparent border-none">
          <FaTimes className="text-2xl text-secondary" />
        </button>
        <h2 className="text-center">Add new Post</h2>
        <form onSubmit={handleSubmit} className="flex flex-column mt-4">
          <div className="flex flex-column align-items-center">
            <label htmlFor="file-upload" className="w-full text-center cursor-pointer border-dotted border-2 border-primary py-7">
              <input id="file-upload" type="file" onChange={handleFileChange} className="hidden" required/>
              {file ? file.name : "Drag & drop files or Browse"}
            </label>
            <small className="text-center mt-2">Supported formats: JPEG, PNG, PDF</small>
          </div>
          <textarea
            placeholder="What's on your mind..."
            value={content}
            onChange={handleContentChange}
            className="mt-4 bg-tint-5 text-base p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary  h-6rem"
            required
          />
          <button type="submit" className="bg-primary text-white border-none border-round py-2 mt-4 w-full">
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPostModal;
