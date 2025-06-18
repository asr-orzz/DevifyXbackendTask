"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("../db");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
router.get('/due', auth_middleware_1.authenticateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const now = new Date();
    const cards = yield db_1.FlashcardModel.find({ userId: req.body.user, dueDate: { $lte: now } });
    res.json(cards);
}));
router.post('/submit', auth_middleware_1.authenticateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { flashcardId, rating } = req.body;
    const card = yield db_1.FlashcardModel.findById(flashcardId);
    if (!card) {
        res.status(404).json({ error: 'Card not found' });
        return;
    }
    const ef = Math.max(1.3, card.easeFactor + (0.1 - (5 - rating) * (0.08 + (5 - rating) * 0.02)));
    const interval = card.repetitions === 0 ? 1 : card.repetitions === 1 ? 6 : Math.round(card.interval * ef);
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + interval);
    card.easeFactor = ef;
    card.repetitions += 1;
    card.interval = interval;
    card.dueDate = dueDate;
    yield card.save();
    yield db_1.ReviewLogModel.create({ flashcardId, rating, userId: req.body.user });
    res.json({ message: 'Review updated', dueDate });
}));
exports.default = router;
