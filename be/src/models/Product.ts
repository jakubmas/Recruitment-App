import { Document, Schema, Model, model } from 'mongoose';
import { IProductInput } from '../interfaces/ProductInput';

export interface IProduct extends Document, IProductInput {}

const InstallmentSchema: Schema = new Schema({
  value: { type: Number, required: true },
  period: { type: Number, required: true },
});

const PriceSchema: Schema = new Schema({
  value: { type: Number, required: true },
  currency: { type: String, required: true },
  installment: { type: InstallmentSchema, required: true },
  validFrom: { type: Date, required: true },
  validTo: { type: Date, required: true },
});

const ProductSchema: Schema = new Schema({
  image: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true, index: true },
  color: { type: String, required: true },
  capacity: { type: Number, required: true, index: true },
  dimensions: { type: String, required: true },
  features: { type: [String], required: true, index: true },
  energyClass: {
    type: String,
    required: true,
    enum: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
    index: true,
  },
  price: { type: PriceSchema, required: true },
});

// Export the model
const Product: Model<IProduct> = model<IProduct>('Product', ProductSchema);

export default Product;
