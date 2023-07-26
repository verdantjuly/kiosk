import { Router } from 'express';
import ItemsController from '../controllers/itmes.controller.js';

const router = Router();

const itemsController = new ItemsController();

router.post('/items', itemsController.makeItem);
router.get('/items', itemsController.getItemList);

export default router;
