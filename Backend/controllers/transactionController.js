import Transaction from "../models/Transaction.js";

export const createTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.create(req.body);
        res.status(201).json({ success: true, message: "Transaction created successfully", data: transaction });
    } catch (error) {
        res.status(400).json({ success: false, message: "Failed to create transaction", error: error.message });
    }
};

export const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find().sort({ date: -1, createdAt: -1 });
        res.json({ success: true, data: transactions });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch transactions", error: error.message });
    }
};

export const updateTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
            new: true, runValidators: true
        });
        if (!transaction) return res.status(404).json({ success: false, message: "Transaction not found" });
        res.json({ success: true, message: "Transaction updated successfully", data: transaction });
    } catch (error) {
        res.status(400).json({ success: false, message: "Failed to update transaction", error: error.message });
    }
};

export const deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findByIdAndDelete(req.params.id);
        if (!transaction) return res.status(404).json({ success: false, message: "Transaction not found" });
        res.json({ success: true, message: "Transaction deleted successfully" });
    } catch (error) {
        res.status(400).json({ success: false, message: "Failed to delete transaction", error: error.message });
    }
};
