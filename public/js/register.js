async function signupFormHandler(event) {
    event.preventDefault();
    const first_name = document.querySelector('#register-first-name').value.trim();
    const last_name = document.querySelector('#register-last-name').value.trim();
    const email = document.querySelector('#register-email').value.trim();
    const master_password = document.querySelector('#register-master-password').value.trim();

    if (first_name && last_name && email && master_password) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                first_name,
                last_name,
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

function revealPassword() {
    var x = document.getElementById("register-master-password");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

document.querySelector('.register-form').addEventListener('submit', signupFormHandler);