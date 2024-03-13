document.addEventListener('DOMContentLoaded', function () {
  alert('hola')
  getBooks();
    
});

// async function getBooks() {
//   try {
//       const response = await fetch('http://localhost:3000/book/all'); // Corrección en la URL, 'localHost' debería ser 'localhost'
//       const datos = await response.json();
      
//       datos.forEach(dato => { // 'datos.array.forEach' debería ser simplemente 'datos.forEach'
//           let div = document.createElement('div');
//           div.innerHTML = `<div class="cardBookContainer card align-content-center fs-5" style="width: 15rem;">
//               <img src="${dato.postbook}" class="card-img-top" alt="${dato.nameBook}">
//               <div class="card-body">
//                   <p class="card-text justify-content-center ">${dato.nameBook}</p>
//               </div>
//           </div>`;
//           document.getElementById('containerBook').appendChild(div);
//       });

//       console.log(datos); // Este console.log p uede ser útil para depurar si la respuesta se ha obtenido correctamente
//   } catch (error) {
//       console.error('Error al obtener los libros:', error); // Manejo de errores
//   }
// }
async function getBooks() {
  try {
      const response = await fetch('http://localhost:3000/book/all');
      const datos = await response.json();

      const container = document.getElementById('containerBook');
      container.innerHTML = ''; // Limpiamos el contenido anterior antes de agregar nuevos elementos

      datos.forEach(dato => {
          let column = document.createElement('div');
          column.classList.add('col-lg-4', 'col-md-6', 'mb-4'); // Aplicar clases de Bootstrap directamente
          column.innerHTML = `<div class="cardBookContainer card align-content-center fs-5" style="width: 100%;">
          <img src="${dato.postbook}" class="card-img-top" alt="Imagen de libro" onerror="this.onerror=null; this.src='https://www.procinal.com/uploads/PELICULAS/Img_movies/Img_360x500/360%20X%20500oppenheimer.jpg';">

              <div class="card-body">
                  <p class="card-text justify-content-center ">${dato.nameBook}</p>
              </div>
          </div>`;
          container.appendChild(column);
      });

      console.log(datos);
  } catch (error) {
      console.error('Error al obtener los libros:', error);
  }
}


