# Product API

A simple API to retrieve and manage products with flexible filtering, sorting, and pagination.

## Features

- **Filtering:** Search products by code, energy class, capacity, and features.
- **Sorting:** Order products by price and capacity, both ascending and descending.
- **Pagination:** Navigate through products easily with page and limit parameters.
- **TypeScript:** Built with TypeScript for better type safety and maintainability.

## Technologies Used

- **Node.js & Express:** Backend server and routing.
- **TypeScript:** Enhanced type safety and code quality.
- **MongoDB & Mongoose:** Database and ODM for data modeling.
- **Postman:** API testing.
- **dotenv:** Environment variable management.

## Getting Started

### Prerequisites

- **Node.js:** [Download and install](https://nodejs.org/)
- **MongoDB:** [Set up MongoDB](https://www.mongodb.com/) locally or use a service like MongoDB Atlas.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/jakubmas/Recruitment-App.git
   ```

2. **Install dependencies:**
   Navigate to be directory and do:

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   - Create a `.env` file in the root directory of be directory.
   - Add the following:

   ```makefile
   PORT=5001
   MONGODB_URI=your_mongodb_connection_string
   ```

4. **Seeding the Database:**
   - Run the seed script to populate the database with mock data:
   ```bash
   npm run seed
   ```

### Running the Server

Start the development server:

```bash
npm run dev
```

The API will be available at [http://localhost:5001](http://localhost:5001).

## API Endpoint

### GET `/api/products`

Retrieve a list of products with optional filtering, sorting, and pagination.

**Base URL:**

```bash
http://localhost:5001/api/products
```

**Query Parameters:**

- `code` (string): Filter by product code (case-insensitive).
- `energyClass` (string): Filter by one or multiple energy classes (e.g., `A,C`).
- `capacity` (string): Filter by one or multiple capacities (e.g., `9,10.5`).
- `features` (string): Filter by multiple features (all must be present, separated by commas).
- `sortBy` (string): Sort by fields like `price` or `capacity` (e.g., `price,capacity`).
- `order` (string): Order of sorting for each field (`asc` or `desc`, separated by commas).
- `page` (number): Page number for pagination (default: `1`).
- `limit` (number): Number of items per page (default: `10`).

**Response:**

```json
{
  "success": true,
  "count": 3,
  "total": 3,
  "page": 1,
  "pages": 1,
  "data": [
    {
      "_id": "60f7c0f5b4d3c72d88f0e1a1",
      "name": "Product Name",
      "code": "WW90T754ABT",
      "energyClass": "A",
      "capacity": 10.5,
      "features": [
        "Silnik inwerterowy",
        "Panel AI Control",
        "Drzwi AddWash",
        "Wyświetlacz elektroniczny"
      ],
      "price": 299.99
    }
    // More products...
  ]
}
```

**Example Requests:**

1. **Fetch All Products:**

   ```bash
   GET http://localhost:5001/api/products
   ```

2. **Filter by Features (Order Doesn't Matter):**

   ```bash
   GET http://localhost:5001/api/products?features=Wyświetlacz%20elektroniczny,Silnik%20inwerterowy,Panel%20AI%20Control,Drzwi%20AddWash
   ```

   ```bash
   GET http://localhost:5001/api/products?features=Silnik%20inwerterowy,Panel%20AI%20Control,Drzwi%20AddWash,Wyświetlacz%20elektroniczny
   ```

   _Both requests return the same results._

3. **Combine Filters, Sorting, and Pagination:**
   ```bash
   GET http://localhost:5001/api/products?code=WW90T754ABT&energyClass=A,C&capacity=9,10.5&features=Silnik%20inwerterowy,Panel%20AI%20Control,Drzwi%20AddWash,Wyświetlacz%20elektroniczny&sortBy=price,capacity&order=asc,desc&page=1&limit=5
   ```

## Testing

We use **Postman** for testing our API. Here are some key test cases:

1. **Basic Retrieval:** Fetch all products without any filters.
2. **Filtering:** Test each filter individually and in combination.
3. **Sorting:** Verify sorting by different fields and orders.
4. **Pagination:** Ensure correct items are returned per page.
5. **Edge Cases:** Handle empty parameters, invalid inputs, and special characters.
6. **Automated Tests:** Postman includes test scripts to automatically verify that the API behaves as expected.

---
