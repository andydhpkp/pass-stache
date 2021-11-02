const { post } = require("../../controllers/api/user-routes");


async function signupFormHandler(event) {
    event.preventDefault();
                // need to add id to handlebars for these queryselectors 
    const firstname = document.querySelector('#username-signup').value.trim();
    const lastname = document.querySelector('#username-signup').value.trim();
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#username-signup').value.trim();
    const masterpass = document.querySelector('#username-signup').value.trim();

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
            
document.querySelector('.btn').addEventListener('submit', signupFormHandler);