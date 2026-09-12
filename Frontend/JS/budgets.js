console.log("Budgets JS Loaded");

const API = "http://localhost:5050/api/budgets";
const setBudgetBtn = document.querySelector(".set-budget-btn");
const budgetModal = document.querySelector("#budgetModal");
const closeModal = document.querySelector("#closeModal");
const cancelBudget = document.querySelector("#cancelBudget");
const budgetCategory = document.querySelector("#budgetCategory");
const budgetAmount = document.querySelector("#budgetAmount");
const saveBudget = document.querySelector("#saveBudget");
let editingBudgetId = null;

const openNewBudgetModal = () => {
    editingBudgetId = null;
    budgetCategory.value = "";
    budgetAmount.value = "";
    budgetModal.classList.add("show");
};

const closeBudgetModal = () => {
    budgetModal.classList.remove("show");
    editingBudgetId = null;
};

setBudgetBtn.addEventListener("click", openNewBudgetModal);
closeModal.addEventListener("click", closeBudgetModal);
cancelBudget.addEventListener("click", closeBudgetModal);

const getCategoryExpense = async (category) => {
    try {
        const response = await fetch("http://localhost:5050/api/transactions");
        const data = await response.json();
        return data.data
            .filter(t => t.type === "expense" && t.category.toLowerCase() === category.toLowerCase())
            .reduce((sum, t) => sum + Number(t.amount), 0);
    } catch {
        return 0;
    }
};

saveBudget.addEventListener("click", async () => {
    const category = budgetCategory.value;
    const amount = Number(budgetAmount.value);

    if (!category || !amount || amount <= 0) {
        alert("Please enter a valid category and amount");
        return;
    }

    try {
        const url = editingBudgetId ? `${API}/${editingBudgetId}` : API;
        const method = editingBudgetId ? "PATCH" : "POST";

        const response = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ category, amount })
        });

        const data = await response.json();

        if (!data.success) throw new Error(data.message);

        closeBudgetModal();
        await loadBudgets();
    } catch (error) {
        console.error(error);
        alert("Failed to save budget");
    }
});

const loadBudgets = async () => {
    try {
        const response = await fetch(API);
        const data = await response.json();
        const budgetCards = document.querySelector("#budgetCards");
        budgetCards.innerHTML = "";

        if (!data.data.length) {
            budgetCards.innerHTML = `<div class="empty">No budgets yet. Click + Set Budget to create one.</div>`;
            return;
        }

        for (const budget of data.data) {
            const used = await getCategoryExpense(budget.category);
            const percentage = Math.min((used / budget.amount) * 100, 100);

            const card = document.createElement("div");
            card.classList.add("budget-card");
            card.innerHTML = `
                <div class="budget-category">
                    <div class="budget-icon">●</div>
                    <span>${budget.category}</span>
                </div>
                <div class="budget-amount">
                    ₹ ${used.toLocaleString("en-IN")}
                    <span>/ ₹ ${Number(budget.amount).toLocaleString("en-IN")}</span>
                </div>
                <div class="budget-progress">
                    <div class="budget-progress-bar" style="width:${percentage}%"></div>
                </div>
                <div class="budget-percent">${Math.round(percentage)}% used</div>
                <div class="budget-actions">
                    <button class="edit-budget-btn">Edit</button>
                    <button class="delete-budget-btn">Delete</button>
                </div>
            `;

            card.querySelector(".edit-budget-btn").addEventListener("click", () => {
                editingBudgetId = budget._id;
                budgetCategory.value = budget.category;
                budgetAmount.value = budget.amount;
                budgetModal.classList.add("show");
            });

            card.querySelector(".delete-budget-btn").addEventListener("click", async () => {
                if (!confirm("Delete this budget?")) return;
                const response = await fetch(`${API}/${budget._id}`, { method: "DELETE" });
                const result = await response.json();
                if (result.success) loadBudgets();
            });

            budgetCards.appendChild(card);
        }
    } catch (error) {
        console.error("Failed to load budgets:", error);
    }
};

loadBudgets();
