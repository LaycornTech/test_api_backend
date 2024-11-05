import express from "express";
import router from "./src/routes/routes";

// Server configuration
const port = 3000;

// Initialize Express application
const app = express();

/**
 * CORS Middleware Configuration
 * Enables cross-origin requests from any domain
 * Allows GET, POST, PUT, DELETE methods
 * Permits Content-Type and Authorization headers
 */
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

// Parse incoming JSON payloads
app.use(express.json());

/**
 * Health check endpoint
 * Used to verify server status
 */
app.get("/health", (req, res) => {
  res.send("Hello, I am up and running!");
});

// Mount API routes
app.use("/api", router);

// Start server and listen on configured port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});