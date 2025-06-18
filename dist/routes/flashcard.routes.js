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
router.post('/', auth_middleware_1.authenticateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const flashcard = yield db_1.FlashcardModel.create(Object.assign(Object.assign({}, req.body), { userId: req.body.user }));
    res.json(flashcard);
}));
router.get('/deck/:deckId', auth_middleware_1.authenticateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cards = yield db_1.FlashcardModel.find({ deckId: req.params.deckId, userId: req.body.user });
    res.json(cards);
}));
router.put('/:id', auth_middleware_1.authenticateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updated = yield db_1.FlashcardModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
}));
router.delete('/:id', auth_middleware_1.authenticateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.FlashcardModel.findByIdAndDelete(req.params.id);
    res.json({ message: 'Flashcard deleted' });
}));
exports.default = router;
