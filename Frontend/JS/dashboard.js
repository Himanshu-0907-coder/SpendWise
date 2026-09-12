const transactionAPI = "http://localhost:5050/api/transactions";

const loadDashboard = async () => {
    try {
        const response = await fetch(transactionAPI);
        const data = await response.json();
        const transactions = data.data;

        const income = transactions
            .filter(t => t.type === "income")
            .reduce((sum, t) => sum + Number(t.amount), 0);

        const expense = transactions
            .filter(t => t.type === "expense")
            .reduce((sum, t) => sum + Number(t.amount), 0);

        document.querySelector("#totalIncome").textContent = `₹ ${income.toLocaleString("en-IN")}`;
        document.querySelector("#totalExpense").textContent = `₹ ${expense.toLocaleString("en-IN")}`;
        document.querySelector("#totalBalance").textContent = `₹ ${(income - expense).toLocaleString("en-IN")}`;

        const list = document.querySelector("#recentTransactions");
        list.innerHTML = "";

        transactions.slice(0, 5).forEach(t => {
            const item = document.createElement("div");
            item.className = "mini-row";
            item.innerHTML = `
                <span>${t.description}<br><small class="muted">${t.category}</small></span>
                <span class="${t.type}">${t.type === "expense" ? "-" : "+"} ₹${Number(t.amount).toLocaleString("en-IN")}</span>
            `;
            list.appendChild(item);
        });
    } catch (error) {
        console.error("Dashboard error:", error);
    }
};

loadDashboard();
