import express, { Application } from 'express';
import cors from 'cors';

const app: Application = express();

// Middleware
app.use(
  cors({
    origin: `http://localhost:${process.env.PORT}`,
  }),
);
app.use(express.json());

// Routes

// Error Handling Middleware

export default app;
