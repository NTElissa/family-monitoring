// budget.js

// Add Budget
const formAddBudget = document.querySelector(".add-budget-form");
formAddBudget.addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    const description = document.getElementById("budget-name").value;
    const TotalBudget = document.getElementById("budget-amount").value;
    const data = { description, TotalBudget };

    const response = await fetch("https://family-monitoring-bn-4fb616af94fc.herokuapp.com/api/v1/family/addBudget", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    alert(responseData.message);
    getBudgets();
    calculateRemainingBudget();
  } catch (error) {
    console.error(error.message);
    alert("An error occurred while adding the budget. Please try again later.");
  }
});

// Attach event listener to load budgets on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  getBudgets();
  calculateRemainingBudget();
});

// Get All Budgets
async function getBudgets() {
  try {
    const response = await fetch("https://family-monitoring-bn-4fb616af94fc.herokuapp.com/api/v1/family/getAllTotalBudget");
    const data = await response.json();
    const budgets = data.budgets;
    let posts = "";

    budgets.forEach((budget) => {
      posts += `
        <tr>
          <td>${budget.description}</td>
          <td>${budget.TotalBudget}</td>
          <td><button class="delete-button" data-id="${budget.id}">Delete</button></td>
        </tr>`;
    });

    const displayTable = document.querySelector(".display-budget tbody");
    displayTable.innerHTML = posts;
  } catch (error) {
    console.error(error.message);
    alert("An error occurred while fetching budgets. Please try again later.");
  }
}

// Calculate and Display Remaining Budget
async function calculateRemainingBudget() {
  const getRemainingBudget = document.querySelector(".dataRemaining");
  try {
    const response = await fetch("https://family-monitoring-bn-4fb616af94fc.herokuapp.com/api/v1/family/calculateRemainingBudget");
    const data = await response.json();
   
    const remainingBudget = data.totalAmount;
    getRemainingBudget.textContent = remainingBudget + " RWF";
  } catch (error) {
    console.error(error.message);
    alert("An error occurred while calculating remaining budget. Please try again later.");
  }
}

// Add event listener for delete buttons
const getBudgetContainer = document.querySelector(".left-side");
getBudgetContainer.addEventListener("click", async (event) => {
  if (event.target.classList.contains("delete-button")) {
    const budgetId = event.target.getAttribute("data-id");
    try {
      const response = await fetch(`https://family-monitoring-bn-4fb616af94fc.herokuapp.com/api/v1/family/deletebudget/${budgetId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseData = await response.json();
      alert(responseData.message);
      getBudgets();
      calculateRemainingBudget();
    } catch (error) {
      console.error(error.message);
      alert("An error occurred while deleting the budget. Please try again later.");
    }
  }
});
