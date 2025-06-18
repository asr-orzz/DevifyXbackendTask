"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityLogModel = exports.ReviewLogModel = exports.FlashcardModel = exports.DeckModel = exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const ObjectId = mongoose_1.Schema.Types.ObjectId;
// User Schema
const userSchema = new mongoose_1.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    email: { type: String, unique: true },
    createdAt: { type: Date, default: Date.now }
});
exports.UserModel = (0, mongoose_1.model)("User", userSchema);
// Deck Schema
const deckSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: String,
    userId: { type: ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now }
});
exports.DeckModel = (0, mongoose_1.model)("Deck", deckSchema);
// Flashcard Schema
const flashcardSchema = new mongoose_1.Schema({
    front: { type: String, required: true },
    back: { type: String, required: true },
    deckId: { type: ObjectId, ref: "Deck", required: true },
    userId: { type: ObjectId, ref: "User", required: true },
    tags: [{ type: String }],
    dueDate: { type: Date, default: Date.now },
    interval: { type: Number, default: 1 },
    easeFactor: { type: Number, default: 2.5 },
    repetitions: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
exports.FlashcardModel = (0, mongoose_1.model)("Flashcard", flashcardSchema);
// Review Log Schema
const reviewLogSchema = new mongoose_1.Schema({
    flashcardId: { type: ObjectId, ref: "Flashcard", required: true },
    userId: { type: ObjectId, ref: "User", required: true },
    rating: { type: Number, required: true },
    reviewedAt: { type: Date, default: Date.now }
});
exports.ReviewLogModel = (0, mongoose_1.model)("ReviewLog", reviewLogSchema);
// Activity Log Schema
const activityLogSchema = new mongoose_1.Schema({
    userId: { type: ObjectId, ref: "User", required: true },
    action: { type: String, required: true },
    metadata: mongoose_1.Schema.Types.Mixed,
    timestamp: { type: Date, default: Date.now }
});
exports.ActivityLogModel = (0, mongoose_1.model)("ActivityLog", activityLogSchema);
