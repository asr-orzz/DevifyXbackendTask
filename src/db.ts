import { model, Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId;

// User Schema
const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  email: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now }
});


export const UserModel = model("User", userSchema);

// Deck Schema
const deckSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  userId: { type: ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now }
});

export const DeckModel = model("Deck", deckSchema);

// Flashcard Schema
const flashcardSchema = new Schema({
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

export const FlashcardModel = model("Flashcard", flashcardSchema);

// Review Log Schema
const reviewLogSchema = new Schema({
  flashcardId: { type: ObjectId, ref: "Flashcard", required: true },
  userId: { type: ObjectId, ref: "User", required: true },
  rating: { type: Number, required: true },
  reviewedAt: { type: Date, default: Date.now }
});

export const ReviewLogModel = model("ReviewLog", reviewLogSchema);

// Activity Log Schema
const activityLogSchema = new Schema({
  userId: { type: ObjectId, ref: "User", required: true },
  action: { type: String, required: true },
  metadata: Schema.Types.Mixed,
  timestamp: { type: Date, default: Date.now }
});

export const ActivityLogModel = model("ActivityLog", activityLogSchema);
