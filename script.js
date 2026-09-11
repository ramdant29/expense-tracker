document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const descriptionInput = document.getElementById('description');
    const amountInput = document.getElementById('amount');
    const categoryInput = document.getElementById('category');
    const transactionsList = document.getElementById('expenses');
    const expenseTotalElement = document.getElementById('expense-total');
    const expenseCountElement = document.getElementById('expense-count');

    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    renderUI();

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const newTransaction = {
            id: Date.now(),
            description: descriptionInput.value.trim(),
            amount: Number(amountInput.value),
            category: categoryInput.value
        };

        expenses.unshift(newTransaction);
        saveAndUpdate();
        form.reset();
    });

    transactionsList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const id = Number(e.target.dataset.id);
            expenses = expenses.filter(t => t.id !== id);
            saveAndUpdate();
        }
    });

    function saveAndUpdate() {
        localStorage.setItem('expenses', JSON.stringify(expenses));
        renderUI();
    }

    function renderUI() {
        expenseCountElement.textContent = expenses.length;

        if (expenses.length === 0) {
            transactionsList.innerHTML = '<li class="no-expenses">Tidak ada transaksi yang ditemukan</li>';
            expenseTotalElement.textContent = 'Rp0';
            return;
        }

        transactionsList.innerHTML = expenses.map(t => `
            <li class="expense">
                <div class="expense-info">
                    <div class="expense-description">${t.description}</div>
                    <div class="expense-category">${t.category}</div>
                </div>
                <div class="expense-amount">Rp${t.amount.toLocaleString('id-ID')}</div>
                <button class="delete-btn" data-id="${t.id}">Hapus</button>
            </li>
        `).join('');

        const total = expenses.reduce((sum, t) => sum + t.amount, 0);
        expenseTotalElement.textContent = `Rp${total.toLocaleString('id-ID')}`;
    }
});