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
const dotenv_1 = __importDefault(require("dotenv"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const deck_routes_1 = __importDefault(require("./routes/deck.routes"));
const flashcard_routes_1 = __importDefault(require("./routes/flashcard.routes"));
const review_routes_1 = __importDefault(require("./routes/review.routes"));
const progress_routes_1 = __importDefault(require("./routes/progress.routes"));
const activity_routes_1 = __importDefault(require("./routes/activity.routes"));
const admin_routes_1 = __importDefault(require("./routes/admin.routes"));
const error_middleware_1 = require("./middleware/error.middleware");
dotenv_1.default.config();
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/v1/auth', auth_routes_1.default);
app.use('/api/v1/decks', deck_routes_1.default);
app.use('/api/v1/flashcards', flashcard_routes_1.default);
app.use('/api/v1/review', review_routes_1.default);
app.use('/api/v1/progress', progress_routes_1.default);
app.use('/api/v1/activity', activity_routes_1.default);
app.use('/api/v1/admin', admin_routes_1.default);
app.use(error_middleware_1.errorHandler);
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.connect(process.env.MONGOOSE_URL);
        console.log("Database Connected");
        app.listen(3000, () => {
            console.log("Server is Running on port 3000");
        });
    });
}
main();
