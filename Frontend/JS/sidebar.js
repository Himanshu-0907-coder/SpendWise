const sidebar = document.querySelector(".sidebar-container");

fetch("../components/sidebar.html")
    .then(response => response.text())
    .then(data => {
        sidebar.innerHTML = data;

        const currentPage = window.location.pathname;
        const menuItems = document.querySelectorAll(".transactions-item");

        menuItems.forEach(item => {
            const page = item.dataset.page;
            if (
                (page === "dashboard" && currentPage.includes("index.html")) ||
                (page === "transactions" && currentPage.includes("transactions.html")) ||
                (page === "budgets" && currentPage.includes("budgets.html")) ||
                (page === "reports" && currentPage.includes("reports.html")) ||
                (page === "settings" && currentPage.includes("settings.html"))
            ) item.classList.add("active");

            item.addEventListener("click", () => {
                const pages = {
                    dashboard: "index.html",
                    transactions: "transactions.html",
                    budgets: "budgets.html",
                    reports: "reports.html",
                    settings: "settings.html"
                };
                window.location.href = pages[page];
            });
        });
    })
    .catch(error => console.error("Sidebar load failed:", error));
