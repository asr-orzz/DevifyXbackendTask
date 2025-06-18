import express from 'express';
import { ActivityLogModel } from '../db';
import { authenticateJWT } from '../middleware/auth.middleware';

const router = express.Router();

router.post('/', authenticateJWT, async (req, res) => {
  const log = await ActivityLogModel.create({ ...req.body, userId: req.body.user });
  res.json(log);
});

router.get('/', authenticateJWT, async (req, res) => {
  const logs = await ActivityLogModel.find({ userId: req.body.user }).sort({ timestamp: -1 });
  res.json(logs);
});

export default router;