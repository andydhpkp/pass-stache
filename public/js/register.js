const { post } = require("../../controllers/api/user-routes");


async function signupFormHandler(event) {
    event.preventDefault();
                // need to add id to handlebars for these queryselectors 
    const first_name = document.querySelector('#registername').value.trim();
    const last_name = document.querySelector('#registerlastname').value.trim();
    const username = document.querySelector('#registerusername').value.trim();
    const email = document.querySelector('#registeremail').value.trim();
    const master_password = document.querySelector('#registerloginpass').value.trim();

    console.log(first_name + last_name + username + email + master_password)

    if (first_name && last_name && username && email && master_password) {
        console.log('this worked')
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                first_name,
                last_name,
                username,
                email,
                master_password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            console.log('success');
        } else {
            alert(response.statusText);
        }
    }
    else {
        console.log('did not work')
    }
}
            
document.querySelector('.btn').addEventListener('submit', signupFormHandler);