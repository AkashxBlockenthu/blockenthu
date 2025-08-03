import { Router } from 'express';
import { getQuote, swap } from '../controllers/swap';

const router = Router();

router.get('/quote', getQuote);
router.post('/swap', swap);

export default router;
