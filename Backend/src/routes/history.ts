import { Router } from 'express';
import { getHistory } from '../controllers/history';

const router = Router();

router.get('/:address', getHistory);

export default router;
