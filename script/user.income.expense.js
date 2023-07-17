function formatDate(dateString) {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString('en-GB', options);
}

function allUsers() {
  const container = document.querySelector(".all-users");
  fetch("https://family-monitoring-bn-4fb616af94fc.herokuapp.com/api/v1/user/allusers")
    .then((res) => res.json())
    .then((data) => {
      const users = data.data;

      for (let i = 0; i < users.length; i++) {
        let user = users[i];
        let rowHTML = `
          <tr>
            <td><img src="${user.image}" class="user-image"></td>
            <td>${user.first_name} ${user.last_name}</td>
            <td>${user.email}</td>
            <td>
              <button class="income-btn" onclick="userIncome(${user.id})">Income</button>
              <button class="expense-btn" onclick="userExpense(${user.id})">Expense</button>
            </td>
          </tr>`;
        container.innerHTML += rowHTML;
      }
    })
    .catch((error) => alert(error));
}

function userIncome(userId) {
  window.location.href = `addincome.html?id=${userId}`;
}

function userExpense(userId) {
  window.location.href = `addexpense.html?id=${userId}`;
}

function loadIncomesAndExpenses() {
  const incomeExpenseTable = document.querySelector(".income-expense-table tbody");

  fetch("https://family-monitoring-bn-4fb616af94fc.herokuapp.com/api/v1/expense/getAllThings")
    .then((res) => res.json())
    .then((data) => {
      const incomes = data.incomes || [];
      const expenses = data.expenses || [];

      // Combine incomes and expenses into a single array
      const incomeExpenseData = incomes.concat(expenses);

      // Sort the combined data by date in descending order
      incomeExpenseData.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateB - dateA;
      });

      incomeExpenseData.forEach((item) => {
        let rowHTML = `
          <tr data-type="${item.category}">
            <td>${item.creatorName}</td>
            <td>${item.category}</td>
            
            <td>${item.description || 'No Description'}</td>
            <td>${item.amount}</td>
            <td>${formatDate(item.date)}</td>
            <td><button class="delete-btn" data-id="${item.id}">Delete</button></td>
          </tr>`;
        incomeExpenseTable.innerHTML += rowHTML;
      });
    })
    .catch((error) => alert(error));
}

function deleteIncome(incomeId) {
  // Replace with your actual URL
  const incomeDeleteURL = `https://family-monitoring-bn-4fb616af94fc.herokuapp.com/api/v1/income/deleteIncomeOne/${incomeId}`;

  fetch(incomeDeleteURL, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        // Handle success (e.g., remove the table row)
        document.querySelector(`[data-id="${incomeId}"]`).remove();
      } else {
        throw new Error("Failed to delete income item");
      }
    })
    .catch((error) => {
      alert(error.message);
    });
}

function deleteExpense(expenseId) {
  // Replace with your actual URL
  const expenseDeleteURL = `https://family-monitoring-bn-4fb616af94fc.herokuapp.com/v1/expense/deleteExpanse/${expenseId}`;

  fetch(expenseDeleteURL, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        // Handle success (e.g., remove the table row)
        document.querySelector(`[data-id="${expenseId}"]`).remove();
      } else {
        throw new Error("Failed to delete expense item");
      }
    })
    .catch((error) => {
      alert(error.message);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  allUsers();
  loadIncomesAndExpenses();

  // Add event listener to handle delete button click
  document.querySelector(".income-expense-table tbody").addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-btn")) {
      const itemId = event.target.getAttribute("data-id");
      const itemType = event.target.closest("tr").getAttribute("data-type");

      // Depending on the itemType, send the appropriate delete request
      if (itemType === "Income") {
        deleteIncome(itemId);
      } else if (itemType === "Expense") {
        deleteExpense(itemId);
      }
    }
  });
});
