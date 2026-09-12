import Budget from "../models/Budget.js";

export const createBudget = async (req, res) => {
    try {
        const budget = await Budget.create(req.body);
        res.status(201).json({ success: true, message: "Budget created successfully", data: budget });
    } catch (error) {
        res.status(400).json({ success: false, message: "Failed to create budget", error: error.message });
    }
};

export const getBudgets = async (req, res) => {
    try {
        const budgets = await Budget.find().sort({ createdAt: -1 });
        res.json({ success: true, data: budgets });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch budgets", error: error.message });
    }
};

export const updateBudget = async (req, res) => {
    try {
        const budget = await Budget.findByIdAndUpdate(req.params.id, req.body, {
            new: true, runValidators: true
        });
        if (!budget) return res.status(404).json({ success: false, message: "Budget not found" });
        res.json({ success: true, message: "Budget updated successfully", data: budget });
    } catch (error) {
        res.status(400).json({ success: false, message: "Failed to update budget", error: error.message });
    }
};

export const deleteBudget = async (req, res) => {
    try {
        const budget = await Budget.findByIdAndDelete(req.params.id);
        if (!budget) return res.status(404).json({ success: false, message: "Budget not found" });
        res.json({ success: true, message: "Budget deleted successfully" });
    } catch (error) {
        res.status(400).json({ success: false, message: "Failed to delete budget", error: error.message });
    }
};
