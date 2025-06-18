import express from 'express';
import { FlashcardModel, ReviewLogModel } from '../db';
import { authenticateJWT } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/due', authenticateJWT, async (req, res) => {
  const now = new Date();
  const cards = await FlashcardModel.find({ userId: req.body.user, dueDate: { $lte: now } });
  res.json(cards);
});

router.post('/submit', authenticateJWT, async (req, res) => {
  const { flashcardId, rating } = req.body;
  const card = await FlashcardModel.findById(flashcardId);
  if (!card) {
    res.status(404).json({ error: 'Card not found' });
    return
  }

  const ef = Math.max(1.3, card.easeFactor + (0.1 - (5 - rating) * (0.08 + (5 - rating) * 0.02)));
  const interval = card.repetitions === 0 ? 1 : card.repetitions === 1 ? 6 : Math.round(card.interval * ef);
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + interval);

  card.easeFactor = ef;
  card.repetitions += 1;
  card.interval = interval;
  card.dueDate = dueDate;
  await card.save();

  await ReviewLogModel.create({ flashcardId, rating, userId: req.body.user });
  res.json({ message: 'Review updated', dueDate });
});

export default router;