import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/api';
import '../styles/AddCar.css';

const AddCar = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('tags', tags);
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }

    try {
      await API.post('/cars', formData);
      navigate('/home');
    } catch (error) {
      console.error('Error adding car:', error);
    }
  };

  const handleGoBack = () => {
    navigate('/home');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Car Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Car Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      ></textarea>
      <input
        type="text"
        placeholder="Tags (comma-separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <input type="file" multiple onChange={handleFileChange} />
      <button type="submit">Add Car</button>
      <button type="button" onClick={handleGoBack} className="go-back-button">Go Back</button>
    </form>
  );
};

export default AddCar;
