// Function to switch to the login form
function switchToLogin() {
    document.getElementById('loginFormContainer').style.display = 'block';
    document.getElementById('signupFormContainer').style.display = 'none';
}

// Function to switch to the sign-up form
function switchToSignup() {
    document.getElementById('loginFormContainer').style.display = 'none';
    document.getElementById('signupFormContainer').style.display = 'block';
}

function logout() {
    sessionStorage.clear();
    toggleButtonConnexion();
}

function cleanInputLog() {
    document.getElementById("newUsername").value = "";
    document.getElementById("newPassword").value = "";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
}

function toggleButtonConnexion() {
    const logInButton = document.getElementById('connexion');
    const logOutButton = document.getElementById('logoutButton');

    if (logInButton.style.display === "block" || logInButton.style.display === "") {
        logInButton.style.display = 'none';
        logOutButton.style.display = 'block';
    } else {
        logInButton.style.display = 'block';
        logOutButton.style.display = 'none';
    }
}

// Function to handle login
function login() {
    const newUsername = document.getElementById("username").value;
    const newPassword = document.getElementById("password").value;

    const base64Credentials = btoa(newUsername + ':' + newPassword);

    $.ajax({
        type: "GET",
        url: config.apiUrl + "/signin",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic ' + base64Credentials);
        },
        success: function (data) {
            sessionStorage.setItem("user_id", data.user_id);
            sessionStorage.setItem("authorization", base64Credentials)

            closeAuthModal()
            cleanInputLog();

            toggleButtonConnexion();
        },
        error: function (data) {
            $("#signinErrorMessage").text("Erreur : " + data.responseJSON.message);
        },
    });
}

// Function to handle sign up
function signup() {
    const newUsername = document.getElementById("newUsername").value;
    const newPassword = document.getElementById("newPassword").value;

    const base64Credentials = btoa(newUsername + ':' + newPassword);

    $.ajax({
        type: "POST",
        url: config.apiUrl + "/signup",
        data: JSON.stringify({
            "login": newUsername,
            "password": newPassword
        }),
        contentType: "application/json; charset=utf-8", // Set the content type to JSON
        dataType: "json",
        success: function (data) {
            sessionStorage.setItem("user_id", data.user_id);
            sessionStorage.setItem("authorization", base64Credentials)

            closeAuthModal();
            cleanInputLog();
            toggleButtonConnexion();
        },
        error: function (data) {
            $("#signupErrorMessage").text("Erreur : " + data.responseJSON.message);
        },
    });
}

// Function to open the authentication modal
function openAuthModal() {
    const authModal = document.getElementById('authModal');

    authModal.style.display = 'block';
    switchToLogin(); // Initially show the login form
}

// Function to close the modal
function closeAuthModal() {
    const authModal = document.getElementById('authModal');
    authModal.style.display = 'none';
}

$(document).ready(function () {
    if (sessionStorage.getItem("user_id") !== "" && sessionStorage.getItem("user_id") != null) {
        toggleButtonConnexion();
    }

    var modal = document.getElementById("authModal");
    // When the user clicks anywhere outside of the modal, close it
    // we clean the login/password
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            cleanInputLog();
        }
    }
});
