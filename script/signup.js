const formSignUp = document.querySelector("#formSignUp");
formSignUp.addEventListener("submit", (event) => {
  event.preventDefault();

  //get data from user
  const first_name = document.getElementById("first_name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const data = { first_name, email, password };
  //interacy with endpoint
  fetch("https://family-monitoring-bn-4fb616af94fc.herokuapp.com/api/v1/user/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      alert(data.message);
      window.location.replace('login.html');
    })
    .catch((error) => {
      console.error(error);
      alert("An error occurred during sign-up. Please try again later.");
    });
});
