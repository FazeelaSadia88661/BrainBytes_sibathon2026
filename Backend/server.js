const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

// Correct import based on your file
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected ✅"))
.catch(err => console.error("MongoDB connection error ❌", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
