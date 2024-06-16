import express from 'express';
import bodyParser from 'body-parser';

import cors from 'cors';
import dotenv from 'dotenv';

import connect from './Database/MongoConnect.js';
import getRoutes from './routes/get.js';
import postRoutes from './routes/post.js';

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
connect(process.env.MONGODB_URI);

// Middleware
app.use(cors());

// Routes
app.use('/get', getRoutes);
app.use('/post', postRoutes);


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
