const formAddExpense = document.querySelector("#formAddExpense");
formAddExpense.addEventListener("submit", (event)=>{

  event.preventDefault();

  // Get data from user
  const  description = document.getElementById("user-description").value;
  const amount = document.getElementById("user-amount").value;

  // Extract person's ID from URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const personId = urlParams.get('id');

  const data = {  description,  amount, personId };

  
    // Interact with the endpoint
    fetch(`https://family-monitoring-bn-4fb616af94fc.herokuapp.com/api/v1/expense/add/expense/${personId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    .then((resp)=>{
      return resp.json();
    })
.then((data)=>{
  alert(data.message)
  window.location.replace('user.income.expense.html');
})
   .catch ((error) => {
    console.error(error.message);
    alert("An error occurred while adding the expense. Please try again later.");
  });
});
// document.addEventListener('DOMContentLoaded', formAddExpense);