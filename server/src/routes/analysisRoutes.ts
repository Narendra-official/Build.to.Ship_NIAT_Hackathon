import { Router } from 'express';
import { getAnalyses, runFrontendAnalysis } from '../controllers/recordController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.use(authenticate);
router.get('/', getAnalyses);
router.post('/run', runFrontendAnalysis);

router.delete('/:id', async (req, res, next) => {
  try {
    const userId = (req as any).user?.userId;
    const { id } = req.params;
    const { supabase } = await import('../db');
    await supabase.from('analyses').delete().eq('id', id).eq('user_id', userId);
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

export default router;
