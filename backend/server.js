const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const authRoutes = require("./routes/authRoutes");
const carRoutes = require("./routes/carRoutes");
const connectDB = require("./config/db");
const dotenv = require("dotenv");

dotenv.config();
connectDB();

app.use(morgan("dev"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/cars", carRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
