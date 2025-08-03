import { Router } from 'express';
import { getBridgeQuote, swap } from '../controllers/bridge';

const router = Router();

router.get('/quote', getBridgeQuote);
router.post('/swap', swap);

export default router;
