document.addEventListener('DOMContentLoaded', function () {
    llenarform();
});

async function llenarform() {
    const divTittle = document.getElementById('tittle');
    const divContent = document.getElementById('container');
    const idbook = localStorage.getItem("idBookUser");

    try {
        const response = await fetch('http://localHost:3000/book/index/' + idbook);
        const datos = await response.json();
        const book = datos[0];
        // Crear elemento para el título
        const titleElement = document.createElement('div');
        titleElement.innerHTML = `<strong>${book.nameBook}</strong>`;
        divTittle.appendChild(titleElement);

        // Crear elemento para el contenido
        const bodyElement = document.createElement('div');
        bodyElement.classList.add('d-flex', 'justify-content-center'); // Añadir la clase 'flex-wrap' para permitir que los elementos fluyan a la siguiente línea
        bodyElement.innerHTML = `
            <div class='contentImgData'>
                <div class='imgDataBook img-fluid' container col-12 >
                    <img class='imgDataBook img-fluid' src="${book.postbook}" alt="Imagen de libro" onerror="this.onerror=null; this.src='https://www.movienewz.com/wp-content/uploads/2014/07/poster-holder.jpg';">
                </div>
            </div>
        `;
        const bodyElement2 = document.createElement('div');
        bodyElement2.classList.add('d-flex', 'justify-content-center', 'text-center')
        bodyElement2.innerHTML = `<div class='col-10 col-sm-6 fs-3 '>
        <strong>Gender:</strong> ${book.genBook}<br>
        <strong>In library:</strong> ${book.amountBook} Books<br>
                ${book.sumBook}  <br>
            </div>`
        divContent.appendChild(bodyElement);
        divContent.appendChild(bodyElement2);

    } catch (error) {
        console.error('Error al obtener los datos del libro:', error);
    }
}
