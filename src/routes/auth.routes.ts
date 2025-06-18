import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from '../db';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const existing = await UserModel.findOne({ username });
  if (existing) {
    res.status(409).json({ error: 'Username taken' });
    return
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await UserModel.create({ username, password: hashed });
  res.json({ message: 'Registered', userId: user._id });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });
  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return
  } 

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    res.status(401).json({ error: 'Invalid credentials' });
    return
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!);
  res.json({ message: 'Login successful', token });
});

export default router;