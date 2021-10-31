const { post } = require("../../controllers/api/user-routes");


async function loginFormHandler(event) {
    event.preventDefault();
                // need to add id to handlebars for these queryselectors 
    const email = document.querySelector('#username-signup').value.trim();
    const masterpass = document.querySelector('#username-signup').value.trim();

    if (email && masterpass) {
        const response = await fetch('./api/users/login', {
            method: post,
            body: JSON.stringify({
                email,
                masterpass
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
         
document.querySelector('.btn').addEventListener('submit', loginFormHandler);