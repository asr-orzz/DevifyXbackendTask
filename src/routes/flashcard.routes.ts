import express from 'express';
import { FlashcardModel } from '../db';
import { authenticateJWT } from '../middleware/auth.middleware';

const router = express.Router();

router.post('/', authenticateJWT, async (req, res) => {
  const flashcard = await FlashcardModel.create({ ...req.body, userId: req.body.user });
  res.json(flashcard);
});

router.get('/deck/:deckId', authenticateJWT, async (req, res) => {
  const cards = await FlashcardModel.find({ deckId: req.params.deckId, userId: req.body.user });
  res.json(cards);
});

router.put('/:id', authenticateJWT, async (req, res) => {
  const updated = await FlashcardModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete('/:id', authenticateJWT, async (req, res) => {
  await FlashcardModel.findByIdAndDelete(req.params.id);
  res.json({ message: 'Flashcard deleted' });
});

export default router;