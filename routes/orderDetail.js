import express from 'express';
import { orderDetailController } from '../controllers/index.js'
import { authMiddleware } from '../middlewares/authMiddlewares.js';

const router = express.Router();

router.get('/static/:fromDate/:toDate', authMiddleware, orderDetailController.dashboardStatic);
router.get('/:id', orderDetailController.getOrderDetailById);

export default router;