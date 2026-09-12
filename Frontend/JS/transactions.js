const API = "http://localhost:5050/api/transactions";

const modal = document.querySelector("#transactionModal");
const addBtn = document.querySelector(".add-transaction-btn");
const closeBtn = document.querySelector("#closeTransactionModal");
const cancelBtn = document.querySelector("#cancelTransaction");
const form = document.querySelector("#transactionForm");
const tbody = document.querySelector("#transactionBody");

const amount = document.querySelector("#amount");
const type = document.querySelector("#type");
const category = document.querySelector("#category");
const description = document.querySelector("#description");
const date = document.querySelector("#date");

let editingId = null;

const openModal = () => modal.classList.add("show");
const closeModal = () => {
    modal.classList.remove("show");
    editingId = null;
    form.reset();
};

addBtn.addEventListener("click", () => {
    editingId = null;
    form.reset();
    date.value = new Date().toISOString().split("T")[0];
    openModal();
});
closeBtn.addEventListener("click", closeModal);
cancelBtn.addEventListener("click", closeModal);

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const payload = {
        amount: Number(amount.value),
        type: type.value,
        category: category.value,
        description: description.value,
        date: date.value
    };

    try {
        const response = await fetch(
            editingId ? `${API}/${editingId}` : API,
            {
                method: editingId ? "PATCH" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            }
        );

        const data = await response.json();
        if (!data.success) throw new Error(data.message);

        closeModal();
        loadTransactions();
    } catch (error) {
        console.error(error);
        alert("Failed to save transaction");
    }
});

const loadTransactions = async () => {
    try {
        const response = await fetch(API);
        const data = await response.json();
        tbody.innerHTML = "";

        if (!data.data.length) {
            tbody.innerHTML = `<tr><td colspan="6" class="empty">No transactions found.</td></tr>`;
            return;
        }

        data.data.forEach(transaction => {
            const row = document.createElement("tr");
            const d = new Date(transaction.date).toLocaleDateString("en-IN");
            row.innerHTML = `
                <td>${d}</td>
                <td>${transaction.description}</td>
                <td>${transaction.category}</td>
                <td class="${transaction.type}">${transaction.type}</td>
                <td class="${transaction.type}">
                    ${transaction.type === "expense" ? "-" : "+"} ₹${Number(transaction.amount).toLocaleString("en-IN")}
                </td>
                <td>
                    <div class="actions">
                        <button class="small-btn edit-btn">Edit</button>
                        <button class="small-btn delete-btn">Delete</button>
                    </div>
                </td>
            `;

            row.querySelector(".edit-btn").addEventListener("click", () => {
                editingId = transaction._id;
                amount.value = transaction.amount;
                type.value = transaction.type;
                category.value = transaction.category;
                description.value = transaction.description;
                date.value = transaction.date.split("T")[0];
                openModal();
            });

            row.querySelector(".delete-btn").addEventListener("click", async () => {
                if (!confirm("Delete this transaction?")) return;
                const response = await fetch(`${API}/${transaction._id}`, { method: "DELETE" });
                const result = await response.json();
                if (result.success) loadTransactions();
            });

            tbody.appendChild(row);
        });
    } catch (error) {
        console.error("Failed to load transactions:", error);
    }
};

loadTransactions();
