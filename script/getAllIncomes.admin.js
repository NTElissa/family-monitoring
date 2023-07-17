function formatDate(dateString) {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString('en-GB', options);
}

function adminHome() {
  const container = document.querySelector('.activity-data');
  fetch('https://family-monitoring-bn-4fb616af94fc.herokuapp.com/api/v1/expense/getAllThings')
    .then((res) => res.json())
    .then((data) => {
      console.log("Data from backend:", data);

      if (Array.isArray(data.incomes) && Array.isArray(data.expenses)) {
        const posts = data.incomes.concat(data.expenses); 
        let tableHTML = `
          <table class="income-table" border="2">
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Date</th>
              <th>Balance</th>
            </tr>
        `; // Initialize the table HTML

        for (let i = posts.length - 1; i >= 0; i--) {
          let post = posts[i];
          console.log("Post:", post); // Log each post for debugging
          let rowHTML = `
            <tr>
              <td>${post.creatorName}</td>
              <td>${post.category}</td> 
              <td>${post.amount}</td>
              <td>${post.description || 'No Description'}</td> 
              <td>${formatDate(post.createdAt)}</td>
              <td>${post.TotalIncome || post.TotalExpense}</td>
            </tr>
          `;
          tableHTML += rowHTML;
        }

        tableHTML += `</table>`; // Close the table tag
        container.innerHTML = tableHTML;
      } else {
        console.log("Invalid data format:", data);
      }
    })
    .catch((error) => alert(error));
}
