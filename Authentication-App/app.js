const URL_API = "https://api.freeapi.app/api/v1/users/register";

const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");

const profileSection = document.getElementById("profileSection");

const profileUsername = document.getElementById("profileUsername");
const profileEmail = document.getElementById("profileEmail");
const profileRole = document.getElementById("profileRole");

const logoutBtn = document.getElementById("logoutBtn");


/** REGISTER */

registerForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const username =
        document.getElementById("registerUsername").value.trim();

    const email =
        document.getElementById("registerEmail").value.trim();

    const password =
        document.getElementById("registerPassword").value.trim();

    const data = {
        username: username,
        email: email,
        password: password
    };

    console.log("Register Data:", data);

    try {

        const response = await fetch(URL_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        console.log("Register Response:", result);

        if (response.ok) {

            alert("Registration successful!");

            registerForm.reset();

        } else {

            alert(result.message);

        }

    } catch (error) {

        console.error("Register Error:", error);

    }

});


/** LOGIN */

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const loginUsername =
        document.getElementById("loginUsername").value.trim();

    const loginPassword =
        document.getElementById("loginPassword").value.trim();

    const loginMessage =
        document.getElementById("loginMessage");

    const loginData = {
        username: loginUsername,
        password: loginPassword
    };

    console.log("Login Data:", loginData);

    try {

        const response = await fetch(
            "https://api.freeapi.app/api/v1/users/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginData)
            }
        );

        const result = await response.json();

        console.log("Login Response:", result);

        if (response.ok) {

            localStorage.setItem(
                "token",
                result.data.accessToken
            );

            loginMessage.textContent =
                "Login successful!";

            registerForm.style.display = "none";
            loginForm.style.display = "none";

            getCurrentUser();

        } else {

            loginMessage.textContent =
                "Login failed: " + result.message;

        }

    } catch (error) {

        console.error("Login Error:", error);

    }

});


/** GET CURRENT USER */

async function getCurrentUser() {

    try {

        const response = await fetch(
            "https://api.freeapi.app/api/v1/users/current-user",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization:
                        "Bearer " +
                        localStorage.getItem("token")
                }
            }
        );

        const profileData = await response.json();

        console.log("Profile Data:", profileData);

        if (response.ok) {

            profileSection.classList.remove("hidden");

            profileUsername.textContent =
                profileData.data.fullName || profileData.data.username;

            profileEmail.textContent =
                profileData.data.email;

            profileRole.textContent =
                profileData.data.role;

        }

    } catch (error) {

        console.error("Profile Error:", error);

    }

}


/** LOGOUT */

logoutBtn.addEventListener("click", () => {

    localStorage.removeItem("token");

    profileSection.classList.add("hidden");

    profileUsername.textContent = "";
    profileEmail.textContent = "";
    profileRole.textContent = "";

    document.getElementById("loginUsername").value = "";
    document.getElementById("loginPassword").value = "";

    registerForm.style.display = "block";
    loginForm.style.display = "block";

    alert("Logged out successfully");

});


/** AUTO LOGIN */

window.addEventListener("DOMContentLoaded", () => {

    const token = localStorage.getItem("token");

    if (token) {

        registerForm.style.display = "none";
        loginForm.style.display = "none";

        getCurrentUser();

    }

});