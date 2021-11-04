async function deletePassHandler(event) {
    // event.preventDefault();
  
    // const id = window.location.toString().split('/')[
    //   window.location.toString().split('/').length - 1
    // ];
    var id = document.getElementById("deletethingy").value;

    console.log(`id = /api/credentials/${id}`)
    const response = await fetch(`/api/credentials/${id}`, {
      method: 'DELETE'
    });
    console.log(`fetch = /api/credentials/${id}`)
  
    // if (response.ok) {
    //   document.location.replace('/dashboard');
    // } else {
    //   alert(response.statusText);
    // }
  }
  
//   document.querySelector('.delete-pass-btn').addEventListener('click', deleteFormHandler);