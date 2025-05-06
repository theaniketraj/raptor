// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    authDomain: "raptor-ee307.firebaseapp.com",
    databaseURL: "https://raptor-ee307-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "raptor-ee307",
    storageBucket: "raptor-ee307.appspot.com",
    messagingSenderId: "155163172070",
    appId: "1:155163172070:web:38c357ea7c9524412e6f27"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

console.log("Firebase Realtime Database Initialized");

// Handle login form submission
document.getElementById("login-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.querySelector("input[type='email']").value.trim();
    const password = document.querySelector("input[type='password']").value.trim();

    if (!validateEmail(email) || password.length < 6) {
        alert("Invalid email or password must be at least 6 characters");
        return;
    }

    try {
        // Convert email to a safe format (Firebase Realtime Database does not allow "." in keys)
        const safeEmail = email.replace(/\./g, "_");

        // Check if the user exists in Realtime Database
        const userRef = ref(database, "users/" + safeEmail);
        const snapshot = await get(userRef);

        if (snapshot.exists()) {
            // User exists, verify password
            let storedEncryptedPassword = snapshot.val().password;
            let decryptedPassword = CryptoJS.AES.decrypt(storedEncryptedPassword, "secretKey").toString(CryptoJS.enc.Utf8);

            if (decryptedPassword === password) {
                alert("Login Successful!");
                console.log("User Logged In: ", email);
            } else {
                alert("Incorrect password!");
            }
        } else {
            // If user is new, register them
            await registerUser(email, password);
        }
    } catch (error) {
        console.error("Realtime Database Error: ", error);
        alert("Error: " + error.message);
    }
});

// Function to register a new user in Realtime Database
async function registerUser(email, password) {
    try {
        // Convert email to safe format for Realtime Database
        const safeEmail = email.replace(/\./g, "_");

        // Encrypt the password before storing
        let encryptedPassword = CryptoJS.AES.encrypt(password, "secretKey").toString();

        // Store user in Realtime Database
        await set(ref(database, "users/" + safeEmail), {
            email: email,
            password: encryptedPassword, // Store encrypted password
            createdAt: new Date().toISOString()
        });

        alert("Registration Successful! You can now log in.");
        console.log("User Registered in Realtime Database: ", email);
    } catch (error) {
        console.error("Registration Error: ", error);
        alert("Error: " + error.message);
    }
}

// Email validation function
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+$/;
    return re.test(email);
}
document.addEventListener("DOMContentLoaded", () => {
    const leftSection = document.querySelector(".left-section");

    leftSection.addEventListener("mousemove", (e) => {
        const trail = document.createElement("div");
        trail.classList.add("rainbow-trail");
        document.body.appendChild(trail);

        // Position the trail at the cursor
        trail.style.left = `${e.clientX}px`;
        trail.style.top = `${e.clientY}px`;

        // Remove the trail after 0.5 seconds
        setTimeout(() => {
            trail.remove();
        }, 500);
    });
});
