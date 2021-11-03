const { post } = require("../../controllers/api/user-routes");


async function signupFormHandler(event) {
    event.preventDefault();
    const firstName = document.querySelector('#register-first-name').value.trim();
    const lastName = document.querySelector('#register-last-name').value.trim();
    const username = document.querySelector('#register-username').value.trim();
    const email = document.querySelector('#register-email').value.trim();
    const master_password = document.querySelector('#register-master-password').value.trim();

    if (firstname && lastname && username && email && masterpass) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                firstName,
                lastName,
                username,
                email,
                master_password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
}
            
document.querySelector('.register-form').addEventListener('submit', signupFormHandler);