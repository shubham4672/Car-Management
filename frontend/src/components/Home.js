
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/api';
import '../styles/Home.css';

const Home = () => {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCars, setFilteredCars] = useState([]);
  const navigate = useNavigate();

  // Fetch all cars from the backend
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const { data } = await API.get('/cars');
        setCars(data);
        setFilteredCars(data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };
    fetchCars();
  }, []);

  // Filter cars based on search term
  useEffect(() => {
    const results = cars.filter(
      (car) =>
        car.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredCars(results);
  }, [searchTerm, cars]);

  const handleViewDetails = (carId) => {
    if (carId) {
      navigate(`/cars/${carId}`);
    } else {
      console.error('Car ID is undefined');
    }
  };

  return (
    <div className="home-container">
      <h1>Car Management App</h1>
      <input
        type="text"
        className="search-bar"
        placeholder="Search cars by name or tags..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="car-list">
        {filteredCars.map((car) => (
          <div className="car-card" key={car._id}>
            <img
              src={car.images && car.images.length > 0 ? `http://localhost:5000/${car.images[0]}` : '/default-car.jpg'}
              alt={car.title}
              className="car-image"
              onError={(e) => {
                e.target.src = '/default-car.jpg';
              }}
            />
            <div className="car-content">
              <h3 className="car-title">{car.title}</h3>
              <p className="car-description">
                {car.description.length > 50 ? `${car.description.substring(0, 50)}...` : car.description}
              </p>
              <div className="car-tags">{car.tags.join(', ')}</div>
              <button className="view-details-button" onClick={() => handleViewDetails(car._id)}>
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;



