import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import budgetRoutes from "./routes/budgetRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDb();

app.get("/", (req, res) => {
    res.json({ message: "SpendWise backend is running" });
});

app.use("/api/transactions", transactionRoutes);
app.use("/api/budgets", budgetRoutes);

app.listen(PORT, () => {
    console.log(`SpendWise API: http://localhost:${PORT}`);
});
