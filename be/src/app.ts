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

// 404 - Not Found
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    error: 'Not Found',
    message: `Cannot find ${req.originalUrl} on this server.`,
  });
});

// Error Handling Middleware
app.use(errorHandler);

export default app;
