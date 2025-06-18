import express from 'express';
import { DeckModel } from '../db';
import { authenticateJWT } from '../middleware/auth.middleware';

const router = express.Router();

router.post('/', authenticateJWT, async (req, res) => {
  const { name, description } = req.body;
  const deck = await DeckModel.create({ name, description, userId: req.body.user });
  res.json(deck);
});

router.get('/', authenticateJWT, async (req, res) => {
  const decks = await DeckModel.find({ userId: req.body.user });
  res.json(decks);
});

router.put('/:id', authenticateJWT, async (req, res) => {
  const updated = await DeckModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete('/:id', authenticateJWT, async (req, res) => {
  await DeckModel.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deck deleted' });
});

export default router;
