import { Router } from 'express';
import OptionsControlller from '../controllers/options.controller.js';

const router = Router();

const optionsController = new OptionsControlller();

router.post('/options', optionsController.makeoption);

export default router;
