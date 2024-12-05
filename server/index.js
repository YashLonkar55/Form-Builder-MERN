import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { formRoutes } from './routes/formRoutes.js';
import { responseRoutes } from './routes/responseRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
// app.use(express.json());
app.use(express.json({ limit: '20mb' })); // Increase to 10MB
app.use(express.urlencoded({ limit: '20mb', extended: true }));

// Routes
app.use('/api/forms', formRoutes);
app.use('/api/responses', responseRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));


console.log(process.env.MONGODB_URI);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});