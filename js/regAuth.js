let users = getUsers();
const registerForm = document.getElementById("register-form");

registerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const registerEmail = document.getElementById("register-email").value;
  const registerPassword = document.getElementById("register-password").value;
  if (!registerEmail || !registerPassword) {
    alert("Enter a valid email and Password");
    return;
  }
  if (alreadyRegistered(registerEmail)) {
    alert("Email is already in use");
    return;
  }
  addUser(registerEmail, registerPassword);
  alert("Registered successfully!");
});
