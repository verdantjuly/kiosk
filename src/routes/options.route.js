import { Router } from 'express';
import OptionsControlller from '../controllers/options.controller.js';

const router = Router();

const optionsController = new OptionsControlller();

router.post('/options', optionsController.makeoption);
router.patch('/options/:id', optionsController.editoption);
router.delete('/response/options/:id', optionsController.answerremoveoption);
router.delete('/options/:id', optionsController.removeoption);
router.get('/options', optionsController.getoptions);

export default router;
