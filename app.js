// Packages
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const cors = require("cors");

// Load env vars
dotenv.config();

// Import utilities
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");

// Import route files
const personsRoute = require("./routes/persons");

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Dev logging middleware
if(process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// File uploading


// Sanitize data


// Set security headers


// Prevent XSS attacks


// Rate limiting


// Prevent http param pollution


// Set static directory


// Routes
app.get("/", (req, res, next) => {
  res.sendFile(__dirname + "/index.html");  
});

app.use("/api/v1/persons", personsRoute);

// Error handler middleware
app.use(errorHandler);

// Server setup
const PORT = process.env.PORT || 5001;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`.yellow.bold);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (error, promise) => {
  console.log(`Error: ${error.message}`.red);

  server.close(() => process.exit(1));
});
