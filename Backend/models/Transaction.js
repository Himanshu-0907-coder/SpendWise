import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    amount: { type: Number, required: true, min: 0 },
    type: { type: String, enum: ["income", "expense"], required: true },
    category: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    date: { type: Date, required: true }
}, { timestamps: true });

export default mongoose.model("Transaction", transactionSchema);
