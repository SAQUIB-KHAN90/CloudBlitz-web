const express = require("express");
const mongoose = require("mongoose");
const app = express();

// Middleware
app.use(express.json());

// MongoDB local connection
mongoose
  .connect("mongodb://localhost:27017/cloudblitz-courses", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB (local)"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Schema and Model
const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  instructor: String,
  category: String,
  createdAt: { type: Date, default: Date.now },
});

const Course = mongoose.model("Course", courseSchema);

// Routes
// 1. Get all courses
app.get("/api/courses", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// 2. Add a new course
// Add a new course
app.post("/api/courses", async (req, res) => {
  try {
    const newCourse = new Course(req.body); // Create a new course with data from the request body
    await newCourse.save(); // Save it to the database
    res.status(201).send("Course added successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
