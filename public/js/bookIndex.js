let contador = 0;
const searchButton = document.getElementById('btnSearchBook');
const nameint = document.getElementById('searchNameBook');
const cleanFilter = document.getElementById('cleanFiltrer');

async function getGender() {
    await fetchDataAndPopulateFilter('http://localhost:3000/book/index', 'GenderFilter', 'nameGen', 'ButtonGen', 'GenderBook');
}

async function getAge() {
    await fetchDataAndPopulateFilter('http://localHost:3000/book/age', 'AgesFilter', 'yearbook', 'Buttonage', 'AgeBook');
}

async function getAuthorbook() {
    await fetchDataAndPopulateFilter('http://localHost:3000/book/author', 'AuthFilter', 'authbook', 'ButtonAuth', 'AuthBook');
}

async function fetchDataAndPopulateFilter(url, containerId, dataProperty, buttonIdPrefix, localStorageKey) {
    const response = await fetch(url);
    const datos = await response.json();
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    datos.forEach((dato, index) => {
        const button = document.createElement('button');
        const buttonId = `${buttonIdPrefix}${index + 1}`;
        button.id = buttonId;
        button.classList.add('buttonFilter');
        button.textContent = dato[dataProperty];
        button.addEventListener('click', function () {
        
            if(containerId === 'GenderFilter'){
                getGenderByName(dato[dataProperty]);
            }else if(containerId === 'AuthFilter'){
                alert('para autor')
            }else{
                alert('para año')
            }
            localStorage.setItem(localStorageKey, dato[dataProperty]);
            cambiarColor(buttonId);
        });

        const column = document.createElement('div');
        column.classList.add('grid');
        column.appendChild(button);
        container.appendChild(column);
    });
}

function cambiarColor(id) {
    const botonActual = document.getElementById(id);
    const botones = document.querySelectorAll('.buttonFilter');

    botones.forEach(boton => {
        boton.classList.remove("presionado");    // Eliminar la clase 'presionado' de todos los botones
    });
    botonActual.classList.add("presionado");// Aplicar la clase 'presionado' solo al botón actual
}

async function getGenderByName(nameGender) {
    const response = await fetch('http://localHost:3000/book/index/gen/' + nameGender);
    const datos = await response.json();
    console.log(datos)
    const container = document.getElementById('containerBook');
    container.innerHTML = '';
    
    datos.forEach(dato => {
        contador = contador + 1
        let column = document.createElement('div');

        column.classList.add("justify-content-center", "col-lg-4", "col-md-6", "mb-4");
        column.innerHTML = `<div id="tarjet${contador}" class="cardBookContainer card align-content-center fs-5 "data-bs-toggle="modal" data-bs-target="#miModal" style="width: 100%; ">
        <img src="${dato.postbook}" class="card-img-top" alt="Imagen de libro" onerror="this.onerror=null; this.src='https://www.movienewz.com/wp-content/uploads/2014/07/poster-holder.jpg';">
        <div class="card-body">
        <p class="card-text justify-content-center ">${dato.nameBook}<br><strong> ${dato.authbook}</strong></p>
        </div>
        </div>`;
        container.appendChild(column);
        document.querySelector('#tarjet' + contador).addEventListener('click', function () {
            // aquí puedes ejecutar una función cuando se hace clic en la tarjeta
            localStorage.setItem('idBookUser', dato.id)
            window.location.href = '../views/BookData.html';
        });
    });
}

async function getAuthor(authbook) {
    const response = await fetch('http://localhost:3000/book/index/author/' + authbook);
    const datos = await response.json();
    const container = document.getElementById('containerBook');
    container.innerHTML = '';
    datos.forEach(dato => {
        contador = contador + 1
        let column = document.createElement('div');

        column.classList.add("justify-content-center", "col-lg-4", "col-md-6", "mb-4");
        column.innerHTML = `<div id="tarjet${contador}" class="cardBookContainer card align-content-center fs-5 "data-bs-toggle="modal" data-bs-target="#miModal" style="width: 100%; ">
        <img src="${dato.postbook}" class="card-img-top" alt="Imagen de libro" onerror="this.onerror=null; this.src='https://www.movienewz.com/wp-content/uploads/2014/07/poster-holder.jpg';">
        <div class="card-body">
        <p class="card-text justify-content-center ">${dato.nameBook}<br><strong> ${dato.authbook}</strong></p>
        </div>
        </div>`;
        container.appendChild(column);
        document.querySelector('#tarjet' + contador).addEventListener('click', function () {
            // aquí puedes ejecutar una función cuando se hace clic en la tarjeta
            localStorage.setItem('idBookUser', dato.id)
            window.location.href = '../views/BookData.html';
        });
    });
}

async function getBooks() {
    try {
        const response = await fetch('http://localhost:3000/book/all');
        const datos = await response.json();
        const container = document.getElementById('containerBook');
        container.innerHTML = ''; // Limpiamos el contenido anterior antes de agregar nuevos elementos

        datos.forEach(dato => {
            contador = contador + 1
            let column = document.createElement('div');

            column.classList.add("justify-content-center", "col-lg-4", "col-md-6", "mb-4");
            column.innerHTML = `<div id="tarjet${contador}" class="cardBookContainer card align-content-center fs-5  style="width: 100%; ">
            <img src="${dato.postbook}" class="card-img-top" alt="Imagen de libro" onerror="this.onerror=null; this.src='https://www.movienewz.com/wp-content/uploads/2014/07/poster-holder.jpg';">
            <div class="card-body">
            <p class="card-text justify-content-center ">${dato.nameBook}<br><strong> ${dato.authbook}</strong></p>
            </div>
            </div>`;
            container.appendChild(column);
            document.querySelector('#tarjet' + contador).addEventListener('click', function () {
                // aquí puedes ejecutar una función cuando se hace clic en la tarjeta
                localStorage.setItem('idBookUser', dato.id)
                window.location.href = '../views/BookData.html';
            });
        });
    } catch (error) {
        console.error('Error al obtener los libros:', error);
    }
}

async function SearchBook() {
    const name = document.getElementById('searchNameBook').value
    const container = document.getElementById('containerBook');
    container.innerHTML = '';
    if (name === '') {
        getBooks()
    } else {
        const response = await fetch('http://localHost:3000/book/name/' + name)
        const datos = await response.json();
        datos.forEach(dato => {
            contador = contador + 1
            let column = document.createElement('div');

            column.classList.add("justify-content-center", "col-lg-4", "col-md-6", "mb-4");
            column.innerHTML = `<div id="tarjet${contador}" class="cardBookContainer card align-content-center fs-5 "data-bs-toggle="modal" data-bs-target="#miModal" style="width: 100%; ">
            <img src="${dato.postbook}" class="card-img-top" alt="Imagen de libro" onerror="this.onerror=null; this.src='https://www.movienewz.com/wp-content/uploads/2014/07/poster-holder.jpg';">
            <div class="card-body">
            <p class="card-text justify-content-center ">${dato.nameBook}<br><strong> ${dato.authbook}</strong></p>
            </div>
            </div>`;
            container.appendChild(column);
            document.querySelector('#tarjet' + contador).addEventListener('click', function () {
                // aquí puedes ejecutar una función cuando se hace clic en la tarjeta
                localStorage.setItem('idBookUser', dato.id)
                window.location.href = '../views/BookData.html';
            });
        });
    }
}

cleanFilter.addEventListener('click', () => {
    location.reload();
})

nameint.addEventListener('input', () => {
    SearchBook();
})

searchButton.addEventListener('click    ', () => {
    SearchBook();
})

document.addEventListener('DOMContentLoaded', function () {
    getBooks();
    getGender();
    getAge();
    getAuthorbook();
});