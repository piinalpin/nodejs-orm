import { Router } from 'express';
import transactionRoute from './app/routes/transactionRoute.js'

const router = Router();

router.get('/', (req, res, next) => {
    res.json({message: 'ok'});
});

router.use('/transaction', transactionRoute);

export default router;