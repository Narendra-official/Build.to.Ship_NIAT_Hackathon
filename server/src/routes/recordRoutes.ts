import { Router } from 'express';
import { createRecord, getRecords, analyzeRecord, getAnalyses } from '../controllers/recordController';
import { authenticate } from '../middleware/auth';

const router = Router();

// Protect all record routes
router.use(authenticate);

router.post('/', createRecord);
router.get('/', getRecords);

router.post('/:id/analyze', analyzeRecord);

export default router;
