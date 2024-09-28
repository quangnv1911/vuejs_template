import express from 'express';
import { orderController } from '../controllers/index.js'

const router = express.Router();

router.get('/', orderController.getAllOrder);
// router.get('/:id', orderController.getOrderById);
router.get('/static/:year', orderController.getRevenueAndProfitByYear);
router.post('/', orderController.createOrder);
router.get('/orderPagination', orderController.getPagination);
router.post('/update', orderController.updateOrder);
router.get('/ratio-returning-customer/:year', orderController.getRatioReturningCustomerAndNewCustomer);

export default router;