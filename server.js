require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json());

// Routes
app.use('/api/auth', require('./src/middleware/auth'));
app.use('/api/food', require('./src/routes/food'));
app.use('/api/order', require('./src/routes/orders')); // Fixed typo: order -> orders

// Default route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Graceful shutdown
process.on('unhandledRejection', (err) => {
    console.error(`Unhandled rejection: ${err.message}`);
    process.exit(1);
});

process.on('uncaughtException', (err) => {
    console.error(`Uncaught exception: ${err.message}`);
    process.exit(1);
});
