const express = require("express");
const carController = require("../controllers/car.controller");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

// Route for getting all cars
router.get("/", carController.getCars);

router.post("/", upload.array("images", 5), carController.createCar); // Limit to 5 files (adjust as needed)

// Route for updating a car
router.put("/:id", carController.updateCar);

//get Car by its ID
router.get("/:id", carController.getCarById);

// Route for deleting a car
router.delete("/:id", carController.deleteCar);

module.exports = router;
