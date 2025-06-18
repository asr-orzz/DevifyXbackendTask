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
router.get('/users', auth_middleware_1.authenticateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body.user;
    if (!(user === null || user === void 0 ? void 0 : user.isAdmin)) {
        res.status(403).json({ message: 'Access denied. Admins only.' });
        return;
    }
    try {
        const users = yield db_1.UserModel.find({}, '-password');
        res.json(users);
    }
    catch (err) {
        res.status(500).json({ message: 'Error fetching users' });
    }
}));
router.delete('/users/:id', auth_middleware_1.authenticateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body.user;
    if (!(user === null || user === void 0 ? void 0 : user.isAdmin)) {
        res.status(403).json({ message: 'Access denied. Admins only.' });
        return;
    }
    try {
        yield db_1.UserModel.findByIdAndDelete(req.params.id);
        yield db_1.DeckModel.deleteMany({ userId: req.params.id });
        yield db_1.FlashcardModel.deleteMany({ userId: req.params.id });
        res.json({ message: 'User and related data deleted' });
    }
    catch (err) {
        res.status(500).json({ message: 'Error deleting user' });
    }
}));
exports.default = router;
