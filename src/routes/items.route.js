import { Router } from 'express';
import ItemsController from '../controllers/itmes.controller.js';

const router = Router();

const itemsController = new ItemsController();

router.post('/items', itemsController.makeItem);
router.get('/items', itemsController.getItemList);
router.delete('/items/:id', itemsController.removeItem);
router.delete('/response/items/:id', itemsController.answerRemoveItem);
router.patch('/items/:id', itemsController.editItem);

export default router;
