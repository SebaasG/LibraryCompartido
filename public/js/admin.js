document.addEventListener("DOMContentLoaded", async () => {
  await getBooks();
});
let count = 0;
let idBook = localStorage.getItem("idBook");

//Obtener todos los libros cuando se cargue la pagina.
async function getBooks() {
  try {
    const response = await fetch("http://localHost:3000/admin/books");
    const data = await response.json();

    const tableBody = document.getElementById("body-table");
    data.forEach((data) => {
      const tr = document.createElement("tr");
      count++;
      console.log(count);
      tr.innerHTML = `
            <td><button id="idBook${count}" class="btn-td" type='button' data-bs-toggle="modal"  data-bs-target="#modal-table">${data.nameBook}</button></td>
            <td><button class="btn-td" type='button' data-bs-toggle="modal"   data-bs-target="#modal-table">${data.genBook}</button></td>
            <td><button class="btn-td" type='button' data-bs-toggle="modal"  data-bs-target="#modal-table">${data.yearbook}</button></td>
            <td><button class="btn-td" type='button' data-bs-toggle="modal"  data-bs-target="#modal-table">${data.authbook}</button></td>
            <td><button class="btn-td" type='button' data-bs-toggle="modal"   data-bs-target="#modal-table">${data.amountBook}</button></td>
            `;
      tableBody.appendChild(tr);
      document
        .querySelector("#idBook" + count)
        .addEventListener("click", async () => {
          localStorage.setItem("idBook", data.idBook);
          // await getBooksById(localStorage.setItem('idBook', data.idBook));

          await getBooksById(data.idBook);
        });
    });
  } catch (err) {
    console.log("No sirve");
  }
}

// Funcion para traer los datos al modal
async function getBooksById(idBook) {
  console.log(`Este es el id:${idBook}`);

  const response = await fetch(`http://localHost:3000/admin/books/${idBook}`);
  const book = await response.json();
  try {
    const {
      nameBook,
      amountBook,
      yearbook,
      authbook,
      postbook,
      genBook,
    } = book[0]; // Destructurar la query.

    //Elementos del html
    const modalTitle = document.getElementById("modal-title"); // llamar modelo.
    const modalBody = document.getElementById("modal-body");

    modalBody.innerHTML = "";

    //Creacion de elemenetos para agregar en el modal
    const poster = document.createElement("div");
    const year = document.createElement('div');
    const amount = document.createElement('div');
    const auth = document.createElement('div');
    const gen = document.createElement('div');

    //Agregar el contenido a html
    poster.innerHTML = `<img class="post-book" src="${postbook}" alt="${nameBook}" onerror="this.onerror=null; this.src=' https://www.movienewz.com/wp-content/uploads/2014/07/poster-holder.jpg';">`
    year.innerHTML = `<p class="fs-4 m-0"><b>Age:</b> ${yearbook}</p>`
    amount.innerHTML = `<p class="fs-4 m-0"> <b>Amount:</b>${amountBook}</p>`
    auth.innerHTML = `<p class="fs-4 mt-4 m-0"> <b>Auth:</b>${authbook}</p>`
    gen.innerHTML = `<p class="fs-4 m-0"> <b>Gendre:</b>${genBook}</p>`
    
    // Agregar al modal
    modalTitle.innerHTML = nameBook;
    modalBody.appendChild(poster);
    modalBody.appendChild(auth);
    modalBody.appendChild(gen);
    modalBody.appendChild(year);
    modalBody.appendChild(amount);

    //Update
    const btnUpdate = document.getElementById('btn-update');
    btnUpdate.addEventListener('click',async()=>{
      await updateBook(idBook, book);
      
    })

  } catch (err) {
    console.log("hubo un error a mostrar el libro por el id ", err);
  }
}

// Funcion para actualizar
async function updateBook (idBook, book){

  try{
    const {
      nameBook,
      amountBook,
      yearbook,
      authbook,
      postbook,
      sumBook,
      genBook,
    } = book[0];
    //Llamar form
    const inpNameBook = document.getElementById('inpt-nameBook').value = nameBook;
    const inpAuthBook = document.getElementById('inpt-authBook').value = authbook;
    const inpYearBook = document.getElementById('inpt-yearBook').value = yearbook;
    const inpGenBook = document.getElementById('inpt-genBook').value = genBook;
    const inpAmountBook = document.getElementById('inpt-amountBook').value = amountBook;
    const inptSumBook = document.getElementById('inpt-sumBook').value = sumBook;
    const inptPostBook = document.getElementById('inpt-postBook').value = postbook;
    //Mostrar en el Html
   
    console.log(`Si se esta haciendo${idBook}`);
  }catch(err){
    console.log(err);
  }

}