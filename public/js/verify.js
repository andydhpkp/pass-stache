async function verifyUser(event) {
    event.preventDefault();

    const userToken = document.querySelector('#user-token').value.trim();

    console.log(`user entered token: ${userToken}`);

    const response = await fetch(`/api/users/verify/${userToken}`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' }
    })

    if (response.ok) {
        document.location.replace('/dashboard')
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.verification-form').addEventListener('submit', verifyUser);