# SpendWise - Complete MERN Project

## Stack
Frontend: HTML + CSS + JavaScript
Backend: Node.js + Express.js
Database: MongoDB + Mongoose

## Folder structure
Frontend/
  components/
  webpages/
  CSS/
  JS/
  public/logo/

Backend/
  config/
  models/
  controllers/
  routes/
  server.js
  .env

## Run backend
1. Open Terminal in Backend folder.
2. Run:
   npm install
3. Make sure MongoDB is running locally.
4. Run:
   npm run dev

Backend: http://localhost:5050

## Open frontend
Open:
Frontend/webpages/index.html

For best results, use VS Code Live Server/Live Preview for the Frontend folder.

## APIs
Transactions:
GET    /api/transactions
POST   /api/transactions
PATCH  /api/transactions/:id
DELETE /api/transactions/:id

Budgets:
GET    /api/budgets
POST   /api/budgets
PATCH  /api/budgets/:id
DELETE /api/budgets/:id

## Important
This project is intentionally local-development ready. No MongoDB Atlas or authentication is configured.
