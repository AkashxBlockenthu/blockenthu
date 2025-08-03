import { Router } from 'express';
import { getChartData } from '../controllers/chart';

const router = Router();

router.get('/', getChartData);

export default router;
