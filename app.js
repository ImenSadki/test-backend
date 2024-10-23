const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/book');

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/uploads', express.static('uploads'));

// Export de l'application configurée
module.exports = app;
