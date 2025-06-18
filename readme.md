
````md
# 🧠 Flashcard Spaced Repetition Backend

A RESTful backend service for a flashcard-based spaced repetition learning system, built with Node.js, Express, and MongoDB.

---

## 🚀 Features

- ✅ JWT-based User Authentication
- ✅ Flashcard & Deck CRUD
- ✅ Spaced Repetition Algorithm (SM-2)
- ✅ Review Scheduling & Progress Tracking
- ✅ Activity Logging
- ✅ Admin Controls
- ✅ Multi-language & Tagging Support (basic)
- ✅ Modular Code & Clean REST API

---

## 🛠️ Tech Stack

- **Node.js** + **Express.js**
- **MongoDB** + **Mongoose**
- **JWT for Authentication**
- **Postman** or **cURL** for testing

---

## 📦 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/flashcard-api.git
cd flashcard-api
````

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Setup

Copy the example environment file and fill in the values:

```bash
cp .env.example .env
```

Edit `.env`:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/flashcardApp
JWT_SECRET=your_jwt_secret_here
```

### 4. Start the Development Server

You can run the server directly using:

```bash
npm run start
```

---

## 🔐 Authentication

Include the JWT token in the `Authorization` header for protected routes:

```
Authorization: Bearer <your_token_here>
```

---

## 📚 API Routes

### 🧑 User Routes (`/api/v1/users`)

| Method | Route       | Description             |
| ------ | ----------- | ----------------------- |
| POST   | `/register` | Register new user       |
| POST   | `/login`    | Login and receive token |

---

### 📦 Deck Routes (`/api/v1/decks`)

| Method | Route      | Description          |
| ------ | ---------- | -------------------- |
| GET    | `/`        | Get all decks (user) |
| POST   | `/`        | Create new deck      |
| PUT    | `/:deckId` | Update a deck        |
| DELETE | `/:deckId` | Delete a deck        |

---

### 🧠 Flashcard Routes (`/api/v1/flashcards`)

| Method | Route           | Description            |
| ------ | --------------- | ---------------------- |
| GET    | `/deck/:deckId` | Get flashcards of deck |
| POST   | `/`             | Create new flashcard   |
| PUT    | `/:cardId`      | Update flashcard       |
| DELETE | `/:cardId`      | Delete flashcard       |

---

### ⏳ Review Routes (`/api/v1/review`)

| Method | Route     | Description                 |
| ------ | --------- | --------------------------- |
| GET    | `/due`    | Get cards due for review    |
| POST   | `/submit` | Submit review (with rating) |

---

### 📈 Progress Routes (`/api/v1/progress`)

| Method | Route    | Description                       |
| ------ | -------- | --------------------------------- |
| GET    | `/stats` | Get user progress (reviewed, due) |

---

### 🛠 Admin Routes (`/api/v1/admin`)

> ⚠️ Requires JWT from a user with `isAdmin: true`

| Method | Route        | Description                |
| ------ | ------------ | -------------------------- |
| GET    | `/users`     | Get all users              |
| DELETE | `/users/:id` | Delete user and their data |

---

## 📂 Project Structure

```
src/
├── db.ts                 # All Mongoose Models
├── middleware/
│   └── auth.middleware.ts
├── routes/
│   ├── user.routes.ts
│   ├── deck.routes.ts
│   ├── flashcard.routes.ts
│   ├── review.routes.ts
│   ├── progress.routes.ts
│   └── admin.routes.ts
├── server.ts             # Express setup & entry point
```

---

## 📌 Notes

* All timestamps (createdAt, reviewedAt, etc.) use ISO date format.
* SM-2 logic is built into review submission logic.
* Admins can manage any user's data via `/api/admin`.

---

## 🧪 Testing

Test using Postman or `curl`. Don’t forget the JWT token!

---
