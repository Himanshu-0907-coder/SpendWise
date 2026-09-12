import express from "express";
import {
    createBudget, getBudgets, updateBudget, deleteBudget
} from "../controllers/budgetController.js";

const router = express.Router();

router.get("/", getBudgets);
router.post("/", createBudget);
router.patch("/:id", updateBudget);
router.delete("/:id", deleteBudget);

export default router;
