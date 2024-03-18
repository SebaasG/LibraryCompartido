let contador = 0;
const searchButton = document.getElementById('btnSearchBook');

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
                console.log(dato.id)
                window.location.href = '../views/BookData.html';
                // llenarModal(dato.id)

            });
        });

    } catch (error) {
        console.error('Error al obtener los libros:', error);
    }

        // async function llenarModal(idBook) {
        //     const response = await fetch('http://localHost:3000/book/index/' + idBook);
        //     const datos = await response.json();
        //     console.log(datos)

        //     document.getElementById('modalTitle').innerText = datos[0].nameBook;

        //     document.getElementById('modalContent').innerHTML = `
        //         <label  class="col-form-label">Gender:</label> 
        //         <p> ${datos[0].genBook}</p>
        //         <label  class="col-form-label">Year:</label> 
        //         <p> ${datos[0].yearbook}</p>
        //         <label  class="col-form-label">Author:</label> 
        //         <p> ${datos[0].authbook}</p> 
        //         <label  class="col-form-label">Summary:</label> 
        //         <p> ${datos[0].sumBook}</p>`;
                
        // }


}

async function SearchBook(){
    const name = document.getElementById('searchNameBook').value
    const container = document.getElementById('containerBook');
    container.innerHTML = '';
    if(name === ''){
        getBooks()
    }else{
        const response = await fetch ('http://localHost:3000/book/name/'+ name)
        const datos = await response.json();
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
                console.log(dato.id)
                llenarModal(dato.id)
    
            });
        });
    }
    

}
const nameint = document.getElementById('searchNameBook')
const cleanFilter = document.getElementById('cleanFiltrer')
cleanFilter.addEventListener('click', ()=>{
    location.reload();

})
nameint.addEventListener('input', ()=>{
    SearchBook();
})
searchButton.addEventListener('click    ', ()=>{
    SearchBook()
})