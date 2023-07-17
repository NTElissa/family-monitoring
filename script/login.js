const userLogin = document.querySelector("#formLogin");
userLogin.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  const data = { email, password };
  console.log("message login", data);

  fetch("https://family-monitoring-bn-4fb616af94fc.herokuapp.com/api/v1/login/use/login", {
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
      if (data.token) {
        showAlert("success", data.message);
        window.location.replace('Admin.html');
      } else {
        showAlert("error", data.message);
      }
    })
    .catch((error) => {
      console.error(error);
      showAlert("error", "An error occurred during sign-up. Please try again later.");
    });
});

function showAlert(type, message) {
  const alertBox = document.createElement("div");
  alertBox.classList.add("alert", type === "success" ? "alert-success" : "alert-danger");
  alertBox.textContent = message;

  document.body.appendChild(alertBox);

  setTimeout(() => {
    alertBox.remove();
  }, 3000); // Remove the alert after 3 seconds
}
