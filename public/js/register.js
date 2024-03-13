const btn = document.getElementById('btn-register');

btn.addEventListener('click',async ()=>{
    console.log('R');
     await register()
})

async function register (){
    const docUser = document.getElementById('docUser').value;
    const nameUser = document.getElementById('nameUser').value;
    const emailUserUser = document.getElementById('emailUser').value;
    const passUser = document.getElementById('passUser').value;
    const phoneUser = document.getElementById('phoneUser').value;
    const addressUser = document.getElementById('addressUser').value;
    
    await fetch('http://localhost:3000/library/register',{
        method: 'POST',
        body: JSON.stringify({
            "docUser": docUser,
        "nameUser": nameUser,
        "emailUser": emailUserUser,
        "passUser":passUser,
        "phoneUser":phoneUser,
       "addressUser":addressUser
        }),
        headers:{
            'Content-Type':'application/json'
        }
    }).then(res=>{
        console.log(res.status);
        if(res.ok){
            Swal.fire({
                icon: 'success',
                title: 'Inicio de sesión exitoso',
                text: 'Se ha iniciado sesión correctamente.',
              });
        }else if(res.status == 409){
            Swal.fire({
                icon: 'error',
                title: 'El usuario ya esta Registrado',
                text: 'El correo o la contraseña, ya estan en uso.',
              });
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Algo salio Mal',
                text: 'Hubo un error en el registro.',
              });
        }
    }).catch(err =>{
        console.log('Hubo un error',err);
        throw err;
    })
}