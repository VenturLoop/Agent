const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// AI Routes
const aiRoutes = require('./routes/aiRoutes');
const marketResearchRoutes = require('./routes/marketResearchRoutes'); // Added this line
app.use('/api/ai', aiRoutes);
app.use('/api/ai/market-research', marketResearchRoutes); // Added this line

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = app;
