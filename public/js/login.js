// const { post } = require("../../controllers/api/user-routes");

async function loginFormHandler(event) {
    event.preventDefault();
    // need to add id to handlebars for these queryselectors 
    const email = document.querySelector('#login-email').value.trim();
    const master_password = document.querySelector('#login-password').value.trim();

    if (email && master_password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                email,
                master_password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        
        if (response.ok) {
            document.location.replace('/verify');
        } else {
            alert(response.statusText);
        }
    }
}

function revealLoginPassword() {
    var x = document.getElementById("login-password");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);