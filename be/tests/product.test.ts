import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../src/app';
import Product from '../src/models/Product';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await Product.deleteMany({});
});

describe('GET /api/products', () => {
  it('should return all products', async () => {
    const products = [
      {
        image: 'https://example.com/image1.jpg',
        code: 'WW90T754ABT',
        name: 'Pralka QuickDrive™',
        color: 'biała',
        capacity: 9,
        dimensions: '55 x 60 x 85 cm',
        features: [
          'Drzwi AddWash™',
          'Panel AI Control',
          'Silnik inwerterowy',
          'Wyświetlacz elektroniczny',
        ],
        energyClass: 'A',
        price: {
          value: 2999.1,
          currency: 'zł',
          installment: {
            value: 53.31,
            period: 60,
          },
          validFrom: new Date('2021-01-01'),
          validTo: new Date('2021-12-31'),
        },
      },
    ];

    await Product.insertMany(products);

    const res = await request(app).get('/api/products');

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveLength(products.length);
    expect(res.body.total).toBe(products.length);
  });

  it('should filter products by energyClass', async () => {
    const products = [
      {
        image: 'https://example.com/image1.jpg',
        code: 'WW90T754ABT',
        name: 'Product A',
        color: 'biała',
        capacity: 9,
        dimensions: '55 x 60 x 85 cm',
        features: ['Feature 1'],
        energyClass: 'A',
        price: {
          value: 2000,
          currency: 'zł',
          installment: {
            value: 50,
            period: 40,
          },
          validFrom: new Date(),
          validTo: new Date(),
        },
      },
      {
        image: 'https://example.com/image2.jpg',
        code: 'WW90T754ABH',
        name: 'Product B',
        color: 'czarna',
        capacity: 10,
        dimensions: '60 x 65 x 90 cm',
        features: ['Feature 2'],
        energyClass: 'B',
        price: {
          value: 2500,
          currency: 'zł',
          installment: {
            value: 60,
            period: 50,
          },
          validFrom: new Date(),
          validTo: new Date(),
        },
      },
    ];

    await Product.insertMany(products);

    const res = await request(app)
      .get('/api/products')
      .query({ energyClass: 'A' });

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].energyClass).toBe('A');
  });

  it('should filter products by capacity', async () => {
    const products = [
      {
        image: 'https://example.com/image1.jpg',
        code: 'WW90T754ABT',
        name: 'Product A',
        color: 'biała',
        capacity: 8,
        dimensions: '55 x 60 x 85 cm',
        features: ['Feature 1'],
        energyClass: 'A',
        price: {
          value: 2000,
          currency: 'zł',
          installment: {
            value: 50,
            period: 40,
          },
          validFrom: new Date(),
          validTo: new Date(),
        },
      },
      {
        image: 'https://example.com/image2.jpg',
        code: 'WW90T754ABH',
        name: 'Product B',
        color: 'czarna',
        capacity: 9,
        dimensions: '60 x 65 x 90 cm',
        features: ['Feature 2'],
        energyClass: 'B',
        price: {
          value: 2500,
          currency: 'zł',
          installment: {
            value: 60,
            period: 50,
          },
          validFrom: new Date(),
          validTo: new Date(),
        },
      },
    ];

    await Product.insertMany(products);

    const res = await request(app)
      .get('/api/products')
      .query({ capacity: '9' });

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].capacity).toBe(9);
  });

  it('should filter products by features', async () => {
    const products = [
      {
        image: 'https://example.com/image1.jpg',
        code: 'WW90T754ABT',
        name: 'Product A',
        color: 'biała',
        capacity: 8,
        dimensions: '55 x 60 x 85 cm',
        features: ['Feature 1', 'Feature 2'],
        energyClass: 'A',
        price: {
          value: 2000,
          currency: 'zł',
          installment: {
            value: 50,
            period: 40,
          },
          validFrom: new Date(),
          validTo: new Date(),
        },
      },
      {
        image: 'https://example.com/image2.jpg',
        code: 'WW90T754ABH',
        name: 'Product B',
        color: 'czarna',
        capacity: 9,
        dimensions: '60 x 65 x 90 cm',
        features: ['Feature 3'],
        energyClass: 'B',
        price: {
          value: 2500,
          currency: 'zł',
          installment: {
            value: 60,
            period: 50,
          },
          validFrom: new Date(),
          validTo: new Date(),
        },
      },
    ];

    await Product.insertMany(products);

    const res = await request(app)
      .get('/api/products')
      .query({ features: 'Feature 1' });

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].features).toContain('Feature 1');
  });

  it('should sort products by price ascending', async () => {
    const products = [
      {
        image: 'https://example.com/image1.jpg',
        code: 'WW90T754ABT',
        name: 'Product A',
        color: 'biała',
        capacity: 8,
        dimensions: '55 x 60 x 85 cm',
        features: ['Feature 1'],
        energyClass: 'A',
        price: {
          value: 3000,
          currency: 'zł',
          installment: {
            value: 50,
            period: 40,
          },
          validFrom: new Date(),
          validTo: new Date(),
        },
      },
      {
        image: 'https://example.com/image2.jpg',
        code: 'WW90T754ABH',
        name: 'Product B',
        color: 'czarna',
        capacity: 9,
        dimensions: '60 x 65 x 90 cm',
        features: ['Feature 2'],
        energyClass: 'B',
        price: {
          value: 2000,
          currency: 'zł',
          installment: {
            value: 60,
            period: 50,
          },
          validFrom: new Date(),
          validTo: new Date(),
        },
      },
    ];

    await Product.insertMany(products);

    const res = await request(app)
      .get('/api/products')
      .query({ sortBy: 'price.value', order: 'asc' });

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveLength(2);
    expect(res.body.data[0].price.value).toBe(2000);
    expect(res.body.data[1].price.value).toBe(3000);
  });

  it('should sort products by capacity descending', async () => {
    const products = [
      {
        image: 'https://example.com/image1.jpg',
        code: 'WW90T754ABT',
        name: 'Product A',
        color: 'biała',
        capacity: 8,
        dimensions: '55 x 60 x 85 cm',
        features: ['Feature 1'],
        energyClass: 'A',
        price: {
          value: 3000,
          currency: 'zł',
          installment: {
            value: 50,
            period: 40,
          },
          validFrom: new Date(),
          validTo: new Date(),
        },
      },
      {
        image: 'https://example.com/image2.jpg',
        code: 'WW90T754ABH',
        name: 'Product B',
        color: 'czarna',
        capacity: 10,
        dimensions: '60 x 65 x 90 cm',
        features: ['Feature 2'],
        energyClass: 'B',
        price: {
          value: 2000,
          currency: 'zł',
          installment: {
            value: 60,
            period: 50,
          },
          validFrom: new Date(),
          validTo: new Date(),
        },
      },
    ];

    await Product.insertMany(products);

    const res = await request(app)
      .get('/api/products')
      .query({ sortBy: 'capacity', order: 'desc' });

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveLength(2);
    expect(res.body.data[0].capacity).toBe(10);
    expect(res.body.data[1].capacity).toBe(8);
  });

  it('should handle invalid query parameters gracefully', async () => {
    const res = await request(app)
      .get('/api/products')
      .query({ capacity: 'invalid' });

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);

    expect(res.body.data).toHaveLength(0);
  });
});
