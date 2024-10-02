import { Router } from 'express';
import { getProducts } from '../controllers/productController';

const router: Router = Router();

router.get('/', getProducts);

export default router;
