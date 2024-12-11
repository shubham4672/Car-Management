import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";
import "../styles/CarDetail.css";

const CarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit form visibility

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await API.get(`/cars/${id}`);
        setCar(response.data);
        setTitle(response.data.title);
        setTags(response.data.tags.join(", "));
      } catch (error) {
        console.error("Error fetching car:", error);
      }
    };
    fetchCar();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedCar = {
        title,
        tags: tags.split(",").map((tag) => tag.trim()),
      };
      const response = await API.put(`/cars/${id}`, updatedCar);

      setCar(response.data);
      setErrorMessage("");

      setTitle(response.data.title);
      setTags(response.data.tags.join(", "));

      setIsEditing(false);
    } catch (error) {
      console.error("Error updating car:", error);
      setErrorMessage("Failed to update car details");
    }
  };

  const handleDelete = async () => {
    try {
      await API.delete(`/cars/${id}`);

      navigate("/home");
    } catch (error) {
      console.error("Error deleting car:", error);
      setErrorMessage("Failed to delete car");
    }
  };

  const handleBackToHome = () => {
    navigate("/home"); // Navigate back to the homepage
  };

  if (!car) return <div>Loading...</div>; // Wait until car data is fetched

  return (
    <div className='car-detail w-screen'>
      <div className='car-info flex flex-col justify-center items-center mx-auto'>
        <h3 className='text-8xl cursor-default font-semibold'>{car.title}</h3>
        <p className='font-light'>{car.description}</p>

        {/* Display tags in a single line below the description */}
        <div className='car-tags'>
          <h4 className='text-black font-mono'>Hashtags:</h4>
          <p className='max-w-96 font-mono'>{car.tags.join(", ")}</p>{" "}
        </div>

        <div className='car-images'>
          {car.images.map((image, index) => (
            <img
              key={index}
              src={`http://localhost:5000/${image}`}
              alt={car.title}
            />
          ))}
        </div>
      </div>

      {!isEditing ? (
        <div className='buttons'>
          <button onClick={() => setIsEditing(true)} className='update-button'>
            Update
          </button>
          <button onClick={handleDelete} className='delete-button'>
            Delete
          </button>
          <button onClick={handleBackToHome} className='back-button'>
            Go Back to Home
          </button>
        </div>
      ) : (
        <div className='update-form'>
          <h3>Update Car Details</h3>
          {errorMessage && <p className='error-message'>{errorMessage}</p>}
          <form onSubmit={handleUpdate}>
            <label>Car Name</label>
            <input
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <label>Hashtags</label>
            <input
              type='text'
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              required
            />

            <button type='submit'>Update</button>
          </form>
          <button onClick={() => setIsEditing(false)} className='cancel-button'>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default CarDetail;
