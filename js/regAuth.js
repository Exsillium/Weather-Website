if (isAlreadyLogedIn()) {
	window.location.href = "/index.html";
}

const registerForm = document.getElementById("register-form");

registerForm.addEventListener("submit", async (event) => {
	event.preventDefault();
	let users = await getUsers();
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
	const registered = await isAlreadyRegistered(registerEmail);
	if (registered) {
		alert("Email is already in use");
		window.location.href = "/login.html";
		return;
	}
	try {
		let userLocation = await saveAsyncUserLocation();
		console.log("userLocation:", userLocation);
		await addUser(
			registerEmail,
			registerPassword,
			userLocation,
			"light",
			userLocation
		).then(async () => {
			await logIn(registerEmail);
		});
		window.location.replace("index.html");
		alert("Registered successfully!");
	} catch {
		await addUser(registerEmail, registerPassword, null, "light", null);
		await logIn(registerEmail);
		window.location.replace("index.html");
		alert("Registered successfully!");
	}
});
