const { post } = require("../../controllers/api/user-routes");


async function signupFormHandler(event) {
    event.preventDefault();
                
    const firstname = document.querySelector('#firstname-register').value.trim();
    const lastname = document.querySelector('#lastname-register').value.trim();
    const username = document.querySelector('#username-register').value.trim();
    const email = document.querySelector('#email-register').value.trim();
    const masterpass = document.querySelector('#masterpass-register').value.trim();

    if (firstname && lastname && username && email && masterpass) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                firstname,
                lastname,
                username,
                email,
                masterpass
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            console.log('success');
        } else {
            alert(response.statusText);
        }
    }
}
            
document.querySelector('#register-form').addEventListener('submit', signupFormHandler);