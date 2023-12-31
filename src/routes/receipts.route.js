import { Router } from 'express';
import ReceiptsController from '../controllers/receipts.controller.js';

const router = Router();

const receiptsController = new ReceiptsController();

router.post('/receipts', receiptsController.buy);
router.patch('/receipts/:order_customer_id', receiptsController.changestate);

export default router;
