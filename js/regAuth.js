/*
  user -> {
    email:"example@gmail.com",
    themw:"light",
    lastSearch: {
      city:"cairo"
      lon:44,
      lat:33,
    },
    location:{
      lon:34,
      lat:34,
    }
  }
*/
if (isAlreadyLogedIn()) {
	window.location.href = "/index.html";
}

let users = getUsers();
const registerForm = document.getElementById("register-form");

registerForm.addEventListener("submit", async (event) => {
	event.preventDefault();
	const registerEmail = document.getElementById("register-email").value;
	const registerPassword = document.getElementById("register-password").value;
	if (!registerEmail || !registerPassword) {
		alert("Enter a valid email and Password");
		return;
	}
	if (registerPassword.length < 8) {
		alert("password must be at least 8 characters");
		return;
	}
	if (isAlreadyRegistered(registerEmail)) {
		alert("Email is already in use");
		window.location.href = "/login.html";
		return;
	}
	try {
		let userLocation = await saveAsyncUserLocation();
		addUser(
			registerEmail,
			registerPassword,
			userLocation,
			"light",
			userLocation
		);
		await logIn(registerEmail);
		window.location.replace("index.html");
		alert("Registered successfully!");
	} catch {
		addUser(registerEmail, registerPassword, null, "light", null);
		await logIn(registerEmail);
		window.location.replace("index.html");
		alert("Registered successfully!");
	}
});
