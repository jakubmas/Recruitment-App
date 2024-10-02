import { Request, Response, NextFunction } from 'express';
import Product from '../models/Product';

// @desc    Get all products with filtering and sorting
// @route   GET /api/products
// @access  Public
export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const {
      code, // Filter by product code (regex, case-insensitive)
      energyClass, // Filter by one or multiple energy classes (A,C)
      capacity, // Filter by one or multiple capacities (9,10.5)
      features, // Filter by multiple features (all must be present)
      sortBy, // Sort by price, capacity
      order = 'asc', // Order: asc or desc
      page = '1', // Pagination: page number
      limit = '10', // Pagination: items per page
    } = req.query;

    const query: any = {};

    // Helper Function to Escape Regex Special Characters
    const escapeRegex = (str: string): string => {
      return str.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
    };

    // Filter by Product Code (Regex, case-insensitive)
    if (code && typeof code === 'string' && code.trim() !== '') {
      query.code = { $regex: escapeRegex(code.trim()), $options: 'i' };
    }

    // Filter by Multiple Energy Classes (eg. A,C)
    if (
      energyClass &&
      typeof energyClass === 'string' &&
      energyClass.trim() !== ''
    ) {
      const classes = energyClass
        .split(',')
        .map((cls) => cls.trim().toUpperCase());
      query.energyClass = { $in: classes };
    }

    // Filter by Multiple Capacities (eg. 9,10.5)
    if (capacity && typeof capacity === 'string' && capacity.trim() !== '') {
      const capacities = capacity
        .split(',')
        .map((cap) => parseFloat(cap.trim()))
        .filter((cap) => !isNaN(cap));
      if (capacities.length > 0) {
        query.capacity = { $in: capacities };
      }
    }

    // Filter by Multiple Features
    if (features && typeof features === 'string' && features.trim() !== '') {
      const featureList = features.split(',').map((ftr) => ftr.trim());

      if (featureList.length > 0) {
        // Use $and with individual $regex conditions for each feature
        query.$and = featureList.map((ftr) => ({
          features: {
            $regex: new RegExp(`^${escapeRegex(ftr)}(?:\\W*)$`, 'i'),
          },
        }));
      }
    }

    // Sorting
    let sortCriteria: any = {};
    if (sortBy && typeof sortBy === 'string' && sortBy.trim() !== '') {
      const sortFields = sortBy.split(',').map((field) => field.trim());
      const sortOrders = (order as string)
        .split(',')
        .map((ord) => ord.trim().toLowerCase());

      sortFields.forEach((field, index) => {
        const sortOrder = sortOrders[index] === 'desc' ? -1 : 1;
        sortCriteria[field] = sortOrder;
      });
    } else {
      sortCriteria = { name: 1 }; // Default sorting by name ascending
    }

    // Pagination
    const pageNumber = parseInt(page as string, 10) || 1;
    const pageSize = parseInt(limit as string, 10) || 10;
    const skip = (pageNumber - 1) * pageSize;

    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .sort(sortCriteria)
      .skip(skip)
      .limit(pageSize);

    res.status(200).json({
      success: true,
      count: products.length,
      total,
      page: pageNumber,
      pages: Math.ceil(total / pageSize),
      data: products,
    });
  } catch (error: any) {
    // Handle CastError specifically
    if (error.name === 'CastError') {
      res.status(400).json({
        success: false,
        error: `Invalid query parameter: ${error.path}`,
      });
    } else {
      next(error);
    }
  }
};
