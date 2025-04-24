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

const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", async (event) => {
	event.preventDefault();
	const loginEmail = document.getElementById("login-email").value;
	const loginPassword = document.getElementById("login-password").value;
	await handleLogin(loginEmail, loginPassword);
});

async function handleLogin(loginEmail, loginPassword) {
	let users = await getUsers();
	if (!loginEmail || !loginPassword) {
		alert("Enter a valid email and Password");
		return;
	}
	if (loginPassword.length < 8) {
		alert("password must be at least 8 characters");
		return;
	}
	const user = users.find(
		(user) =>
			user.email === loginEmail && verifyPassword(loginPassword, user.password)
	);

	if (user) {
		await logIn(loginEmail);
		window.location.replace("index.html");
	} else {
		alert("Invalid email or password");
	}
}
