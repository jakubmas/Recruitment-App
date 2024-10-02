import express, { Application } from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes';
import errorHandler from './middleware/errorHandler';

const app: Application = express();

// Middleware
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }),
);
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);

// Error Handling Middleware
app.use(errorHandler);

export default app;
