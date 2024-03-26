const backButton = document.getElementById('btnbackData');
backButton.addEventListener('click', () => {
    window.location.href = '../views/booksIndex.html'
})

document.addEventListener('DOMContentLoaded', function () {
    getUser();
});

function selectUnderline(elemento) {
    // Obtén todos los elementos con la clase 'optionTittleNav'
    var elementos = document.querySelectorAll('.optionTittleNav');

    // Remueve la clase 'seleccionado' de todos los elementos
    elementos.forEach(function (el) {
        el.classList.remove('selectElement');
    });

    // Añade la clase 'seleccionado' al elemento actual
    elemento.classList.add('selectElement');
}


async function getUser() {
    const emailUser = localStorage.getItem('correo');
    const response = await fetch('http://localhost:3000/book/user/'+emailUser);
    const datos = await response.json();

    const nameUser = document.getElementById('nameUser');

    nameUser.innerHTML = '';

    const nameContainer = document.createElement('h3');
    nameContainer.innerHTML = `Bienvenid@ ${datos[0].nameUser}`;

    nameUser.appendChild(nameContainer);
}





