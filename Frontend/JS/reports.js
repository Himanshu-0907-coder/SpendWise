const loadReports = async () => {
    const response = await fetch("http://localhost:5050/api/transactions");
    const data = await response.json();
    const transactions = data.data;
    const income = transactions.filter(t=>t.type==="income").reduce((s,t)=>s+Number(t.amount),0);
    const expense = transactions.filter(t=>t.type==="expense").reduce((s,t)=>s+Number(t.amount),0);
    document.querySelector("#reportIncome").textContent = `₹ ${income.toLocaleString("en-IN")}`;
    document.querySelector("#reportExpense").textContent = `₹ ${expense.toLocaleString("en-IN")}`;
    document.querySelector("#reportBalance").textContent = `₹ ${(income-expense).toLocaleString("en-IN")}`;
};
loadReports();
