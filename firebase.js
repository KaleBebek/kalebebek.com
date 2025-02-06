// 🔹 Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// 🔹 Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBADuf9znyprVCwOmn1vocjIiOsnrIkekc",
    authDomain: "kalebebeksite.firebaseapp.com",
    projectId: "kalebebeksite",
    storageBucket: "kalebebeksite.firebasestorage.app",
    messagingSenderId: "645799759143",
    appId: "1:645799759143:web:6f6b679b03c9619271ed02"
};

// 🔹 Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 🔹 Function to update UI based on auth state
function updateUI(user) {
    if (user) {
        // ✅ User is logged in → Show protected content
        document.getElementById("login-form").style.display = "none";
        document.getElementById("protected-content").style.display = "block";
        document.getElementById("logout-btn").style.display = "inline";
    } else {
        // ❌ User is not logged in → Show login form
        document.getElementById("login-form").style.display = "block";
        document.getElementById("protected-content").style.display = "none";
        document.getElementById("logout-btn").style.display = "none";
    }
}

// 🔹 Login Function (Password-only login using Firebase)
window.login = function() {
    const password = document.getElementById("password").value;

    // 🔐 Attempt to sign in with dummy email and entered password
    const dummyEmail = "user@domain.com"; // The dummy email we used during signup

    signInWithEmailAndPassword(auth, dummyEmail, password)
        .then((userCredential) => {
            // ✅ Successful login
            updateUI(userCredential.user);
        })
        .catch((error) => {
            alert("Login failed: Incorrect password");
        });
};

// 🔹 Logout Function (No Reload)
window.logout = function() {
    signOut(auth).then(() => {
        console.log("Signed out successfully.");

        // Manually clear the password input
        const passwordField = document.getElementById('password');
        if (passwordField) {
            passwordField.value = '';  // Clears the password field
        }

        // Clear session/local storage
        sessionStorage.clear();
        localStorage.clear();

        // Ensure UI is updated
        updateUI(null);
    }).catch((error) => {
        console.error("Sign out error:", error);
    });
};

// 🔹 Handle Authentication State Changes
onAuthStateChanged(auth, (user) => {
    updateUI(user);
});

// 🔹 Add event listener for Enter key to trigger login
document.getElementById("password").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        login(); // Trigger login if Enter is pressed
    }
});
