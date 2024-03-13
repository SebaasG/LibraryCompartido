const btn = document.getElementById('btn-login');

btn.addEventListener('click', async()=>{
    await login();
})

async function login(){
    const emailUser = document.getElementById('emailUser').value;
    const passUser = document.getElementById('passUser').value;
    fetch('http://localhost:3000/library/login',{
        method: 'POST',
        body: JSON.stringify({
            "emailUser": emailUser,
            "passUser": passUser
        }),
        headers:{
            'Content-Type':'application/json'    
        }
    }).then(res =>{
        if(res.status === 404){
            Swal.fire({
                icon: 'error',
                title: 'Usuario Incorrecto.',
                text: 'No se encontro el Usuario.',
                didClose: () => {
                    // Redirige a la página deseada
                    window.location.href = 'http://localhost:3000/library/index.html';
                  }
              });
        }else{
            Swal.fire({
                icon: 'success',
                title: 'Inicio de Sesion con Exito.',
                text: 'Bienvenido a la mejor Biblioteca de todas.',
                didClose: () => {
                    // Redirige a la página deseada
                    window.location.href = 'http://localhost:3000/library/views/booksIndex.html';
                  }
            });
        }
    })

}