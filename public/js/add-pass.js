async function newPasswordHandler(event) {
    event.preventDefault();
    const nickname = document.querySelector('#passname-field').value.trim();
    const login_name = document.querySelector('#username-field').value.trim();
    const password = document.querySelector('#pass-field').value.trim();

    if (nickname && login_name && password) {
        console.log('first worked')
        const response = await fetch('/api/credentials', {
            method: 'post',
            body: JSON.stringify({
                nickname,
                login_name,
                password
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

async function updatePassword(event) {

    event.preventDefault()

    const login_name = document.querySelector('#login_name').value.trim();
    const password = document.querySelector('#copythingy').value.trim();

    var id = document.getElementById('deletethingy').value;
    console.log('id is ' + id)
    const response = await fetch(`/api/credentials/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            login_name,
            password
        }),
        headers: { 'Content-Type': 'application/json' }
    })
    if (response.ok) {
        document.location.replace('/dashboard')
    } else {
        alert(response.statusText)
    }
}

document.querySelector('.add-credential').addEventListener('submit', newPasswordHandler);

// document.querySelector('.passwordUpdate').addEventListener('submit', updatePassword);