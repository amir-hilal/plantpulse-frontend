import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import Loading from 'react-loading';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import api from '../../services/api';
import { addNewPost } from '../../features/community/postsSlice';

const AddPostModal = ({ isOpen, onClose }) => {
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
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

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    }
    formData.append('title', title);
    formData.append('content', content);

    try {
      const response = await api.post('/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 201) {
        toast.success('Post created successfully');
        dispatch(addNewPost(response.data.post));
        setTitle('');
        setContent('');
        setFile(null);
        setFilePreview(null);
        onClose();
      }
    } catch (error) {
      if (!error.response) {
        toast.error('Unable to connect to the server. Please try again later.');
      } else {
        toast.error('Failed to create post');
      }
    } finally {
      setLoading(false); // End loading
    }
  };

  if (!isOpen) return null;

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
        <h2 className="text-center m-0">Add New Post</h2>
        <form onSubmit={handleSubmit} className="flex flex-column mt-1">
          <div className="flex flex-column mb-4">
            <input
              id="title"
              type="text"
              value={title}
              onChange={handleTitleChange}
              className="p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary"
              placeholder="Enter title"
              required
            />
          </div>
          <div className="flex flex-column mb-1">
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
          <div className="flex flex-column">
            <textarea
              id="content"
              placeholder="What's on your mind..."
              value={content}
              onChange={handleContentChange}
              className="mt-2 bg-tint-5 text-base p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary h-6rem"
              required
            />
          </div>
          <button
            type="submit"
            className={` text-white border-none border-round py-2 mt-2 w-full flex justify-content-center align-items-center ${
              !title || !content || loading
                ? 'bg-green-400'
                : 'bg-primary cursor-pointer'
            } `}
            disabled={!title || !content || loading}
          >
            {loading ? (
              <Loading type="spin" color="#fff" height={20} width={20} />
            ) : (
              'Post'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPostModal;
