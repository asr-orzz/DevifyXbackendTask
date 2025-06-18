import express from "express"
import dotenv from "dotenv"
import authRoutes from './routes/auth.routes';
import deckRoutes from './routes/deck.routes';
import flashcardRoutes from './routes/flashcard.routes';
import reviewRoutes from './routes/review.routes';
import progressRoutes from './routes/progress.routes';
import activityRoutes from './routes/activity.routes';
import adminRoutes from './routes/admin.routes';
import { errorHandler } from "./middleware/error.middleware";
dotenv.config()
import mongoose from "mongoose";

const app = express();

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/decks', deckRoutes);
app.use('/api/v1/flashcards', flashcardRoutes);
app.use('/api/v1/review', reviewRoutes);
app.use('/api/v1/progress', progressRoutes);
app.use('/api/v1/activity', activityRoutes);
app.use('/api/v1/admin', adminRoutes);

app.use(errorHandler);

async function main(){
    await mongoose.connect(process.env.MONGOOSE_URL!);
    console.log("Database Connected");
    app.listen(3000,()=>{
        console.log("Server is Running on port 3000");
    })
}

main();


