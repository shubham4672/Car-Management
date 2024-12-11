const Car = require('../models/Car');
const multer = require('multer');
const path = require('path');

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder where files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to avoid filename conflicts
  }
});

// Set up file filter to only allow images (optional)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // File is allowed
  } else {
    cb(new Error('Only image files are allowed'), false); // Reject file
  }
};

// Initialize multer with storage settings
const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

// Controller functions

exports.createCar = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No images uploaded' });
    }
    const images = req.files.map(file => file.path);
    const { title, description, tags } = req.body;

    // Create a new car entry in your database
    const car = new Car({
      // user: req.user.id, // assuming you're attaching user ID from authentication
      title,
      description,
      tags,
      images,
    });

    await car.save();
    res.status(201).json(car); // Send the newly created car as response
  } catch (error) {
    console.error('Error adding car:', error);
    res.status(500).json({ message: 'Failed to add car' });
  }
};

exports.getCars = async (req, res) => {
  try {
    // Retrieve all cars with specific fields including tags
    const cars = await Car.find({}, 'title description tags images');
    res.json(cars);
  } catch (error) {
    console.error('Error fetching cars:', error);
    res.status(500).json({ message: 'Failed to fetch cars' });
  }
};


exports.updateCar = async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    const car = await Car.findByIdAndUpdate(
      req.params.id,
      { title, description, tags },
      { new: true }
    );
    res.json(car);
  } catch (error) {
    console.error('Error updating car:', error);
    res.status(500).json({ message: 'Failed to update car' });
  }
};

exports.getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    res.json(car);
  } catch (error) {
    console.error('Error fetching car by ID:', error);
    res.status(500).json({ message: 'Failed to fetch car' });
  }
};

exports.deleteCar = async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.params.id);
    res.json({ message: 'Car deleted' });
  } catch (error) {
    console.error('Error deleting car:', error);
    res.status(500).json({ message: 'Failed to delete car' });
  }
};
