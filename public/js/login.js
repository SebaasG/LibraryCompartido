const btn = document.getElementById('btn-login');

btn.addEventListener('click', async () => {
    await login();
})

async function login() {
    const emailUser = document.getElementById('emailUser').value;
    const passUser = document.getElementById('passUser').value;


    if (!emailUser || !passUser) {
        // Si alguno de los campos está vacío, muestra una alerta
        Swal.fire({
            icon: 'error',
            title: 'Campos requeridos.',
            text: 'Por favor llene todos los campos para iniciar sesion.',
            iconColor: 'red',
            confirmButtonColor: '#000',
        });
        return;
    }
    fetch('http://localhost:3000/library/login', {
        method: 'POST',
        body: JSON.stringify({
            "emailUser": emailUser,
            "passUser": passUser
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        if (res.status === 404) {
            Swal.fire({
                icon: 'error',
                title: 'Usuario Incorrecto.',
                text: 'No se encontro el Usuario.',
                iconColor: 'red',
                confirmButtonColor: '#000',
                didClose: () => {
                    // Redirige a la página deseada
                    window.location.href = 'http://localhost:3000/library/index.html';
                }
            });
        } else if (res.status === 201) {


            Swal.fire({
                icon: 'success',
                title: 'Inicio Sesion Como Administrador.',
                text: 'Bienvenido a la mejor Biblioteca de todas Admin.',
                iconColor: 'green',
                confirmButtonColor: '#000',

                didClose: () => {
                    // Redirige a la página deseada
                    window.location.href = 'http://localhost:3000/library/views/adminBooks.html';

                }
            });
        } else {
            localStorage.setItem('correo', emailUser);
            Swal.fire({
                icon: 'success',
                title: 'Inicio de Sesion con Exito.',
                text: 'Bienvenido a la mejor Biblioteca de todas.',
                iconColor: 'green',
                confirmButtonColor: '#000',
                didClose: () => {
                    // Redirige a la página deseada
                    window.location.href = 'http://localhost:3000/library/views/booksIndex.html';
                }
            });
        }
    })


}