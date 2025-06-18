import express from 'express';
import { UserModel, DeckModel, FlashcardModel } from '../db';
import { authenticateJWT } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/users', authenticateJWT, async (req, res) => {
  const user = req.body.user;
  if (!user?.isAdmin) {
     res.status(403).json({ message: 'Access denied. Admins only.' });
     return
  }

  try {
    const users = await UserModel.find({}, '-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

router.delete('/users/:id', authenticateJWT, async (req, res) => {
  const user = req.body.user;
  if (!user?.isAdmin) {
     res.status(403).json({ message: 'Access denied. Admins only.' });
     return
  }

  try {
    await UserModel.findByIdAndDelete(req.params.id);
    await DeckModel.deleteMany({ userId: req.params.id });
    await FlashcardModel.deleteMany({ userId: req.params.id });
    res.json({ message: 'User and related data deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user' });
  }
});

export default router;
