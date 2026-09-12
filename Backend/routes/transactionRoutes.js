import express from "express";
import {
    createTransaction, getTransactions, updateTransaction, deleteTransaction
} from "../controllers/transactionController.js";

const router = express.Router();

router.get("/", getTransactions);
router.post("/", createTransaction);
router.patch("/:id", updateTransaction);
router.delete("/:id", deleteTransaction);

export default router;
