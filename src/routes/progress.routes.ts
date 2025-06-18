import express from 'express';
import { FlashcardModel } from '../db';
import { authenticateJWT } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/', authenticateJWT, async (req, res) => {
  const userId = req.body.user;
  const total = await FlashcardModel.countDocuments({ userId });
  const due = await FlashcardModel.countDocuments({ userId, dueDate: { $lte: new Date() } });
  const mastered = await FlashcardModel.countDocuments({ userId, interval: { $gt: 21 } });
  res.json({ total, dueToday: due, mastered });
});

export default router;
