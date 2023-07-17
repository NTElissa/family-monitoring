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
      alert(data.message);
      window.location.replace('addincome.html');
    })
    .catch((error) => {
      console.error(error);
      alert("An error occurred during sign-up. Please try again later.");
    });
});
