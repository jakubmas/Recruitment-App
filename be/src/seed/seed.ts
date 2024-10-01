import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product';
import mockData from '../mocks/data';
import { IProductInput } from '../interfaces/ProductInput';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('MongoDB connected for seeding');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const seedProducts = async () => {
  await connectDB();
  await Product.deleteMany({});
  await Product.insertMany(mockData as IProductInput[]);
  console.log('Database seeded!');
  mongoose.connection.close();
};

seedProducts();
