let contador = 0;

document.addEventListener('DOMContentLoaded', function () {

    getBooks();

});

async function getBooks() {
    try {
        const response = await fetch('http://localhost:3000/book/all');
        const datos = await response.json();

        const container = document.getElementById('containerBook');
        container.innerHTML = ''; // Limpiamos el contenido anterior antes de agregar nuevos elementos

        datos.forEach(dato => {
            contador = contador + 1
            console.log(contador)
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

                // llenarModal(datos.id)
            });
        });


        async function llenarModal(idBook) {
            const response = await fetch('http://localHost:1234/task/doc/' + idBook);
            const datos = await response.json();
            const cate = validarCate(datos[0].cateTask);
            const formDate = newDate(datos[0].dateStart, true);
            const states = state(datos[0].stateTask);

            document.getElementById('modalTitle').innerText = datos[0].nameTask;

            document.getElementById('modalContent').innerHTML = `
                <label  class="col-form-label">Description task:</label> 
                <p> ${datos[0].descTask}</p>
                <label  class="col-form-label">Date:</label> 
                <p> ${formDate}</p>
                <label  class="col-form-label">State:</label> 
                <p> ${states}</p>
                <label  class="col-form-label">Category:</label> 
                <p> ${cate}</p> `;
        }

        console.log(datos);
    } catch (error) {
        console.error('Error al obtener los libros:', error);
    }
}


