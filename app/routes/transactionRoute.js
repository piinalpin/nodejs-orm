import { Router } from 'express';
import * as transactionService from '../service/transactionService.js';
import * as transactionDetailService from '../service/transactionDetailService.js';

const router = Router();

// Transaction
router.post('/', transactionService.create);
router.get('/', transactionService.getAll);
router.get('/search', transactionService.search);

// Detail
router.get('/detail', transactionDetailService.search);
router.put('/detail/:id', transactionDetailService.update);
router.delete('/detail/:id', transactionDetailService.deleteById);

export default router;