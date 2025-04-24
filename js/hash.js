// --- Helper Functions ---

const salt = new Uint8Array(16);
salt.set(location.hostname);

// Convert ArrayBuffer to Hex String
function ab2hex(buf) {
	return Array.prototype.map
		.call(new Uint8Array(buf), (x) => ("00" + x.toString(16)).slice(-2))
		.join("");
}

// Convert Hex String to ArrayBuffer
function hex2ab(hex) {
	const typedArray = new Uint8Array(
		hex.match(/[\da-f]{2}/gi).map((h) => parseInt(h, 16))
	);
	return typedArray.buffer;
}

// --- Password Hashing Functions ---

async function hashPassword(password) {
	// const salt = location.hostname;
	// const salt = window.crypto.getRandomValues(new Uint8Array(16)); // Generate random 16-byte salt
	const iterations = 100000; // Number of iterations (adjust as needed for security vs performance)
	const hashAlgorithm = "SHA-256"; // Underlying hash function for PBKDF2
	const keyLength = 256; // Desired hash length in bits (e.g., 256 for SHA-256)

	const enc = new TextEncoder();
	const keyMaterial = await window.crypto.subtle.importKey(
		"raw",
		enc.encode(password),
		{ name: "PBKDF2" },
		false, // not extractable
		["deriveBits"]
	);

	const hashBuffer = await window.crypto.subtle.deriveBits(
		{
			name: "PBKDF2",
			salt: salt,
			iterations: iterations,
			hash: hashAlgorithm,
		},
		keyMaterial,
		keyLength // Derive this many bits
	);

	return {
		salt: ab2hex(salt), // Return salt as hex string
		hash: ab2hex(hashBuffer), // Return hash as hex string
	};
}

async function verifyPassword(passwordAttempt, storedHashHex) {
	// const salt = hex2ab(storedSaltHex); // Convert stored hex salt back to ArrayBuffer
	const storedHash = hex2ab(storedHashHex); // Convert stored hex hash back to ArrayBuffer

	// Use the SAME parameters as when hashing
	const iterations = 100000;
	const hashAlgorithm = "SHA-256";
	const keyLength = 256;

	const enc = new TextEncoder();
	const keyMaterial = await window.crypto.subtle.importKey(
		"raw",
		enc.encode(passwordAttempt),
		{ name: "PBKDF2" },
		false,
		["deriveBits"]
	);

	const hashAttemptBuffer = await window.crypto.subtle.deriveBits(
		{
			name: "PBKDF2",
			salt: salt, // Use the original salt
			iterations: iterations,
			hash: hashAlgorithm,
		},
		keyMaterial,
		keyLength
	);

	// Compare the derived hash attempt with the stored hash
	// Simple length check first
	if (hashAttemptBuffer.byteLength !== storedHash.byteLength) {
		return false;
	}

	// Compare byte-by-byte (avoids timing attacks in some theoretical scenarios, though less critical in typical JS)
	const hashAttemptView = new Uint8Array(hashAttemptBuffer);
	const storedHashView = new Uint8Array(storedHash);
	let diff = 0;
	for (let i = 0; i < hashAttemptView.length; i++) {
		diff |= hashAttemptView[i] ^ storedHashView[i]; // XOR bytes; result is non-zero if they differ
	}
	return diff === 0; // If diff is still 0, the hashes match
}
