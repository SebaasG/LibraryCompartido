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
            <td>${data.nameBook}</td>
            <td>${data.genBook}</td>
            <td>${data.yearbook}</td>
            <td>${data.authbook}</td>
            <td>${data.amountBook}</td>
            <td ><button id="idBook${count}" data-bs-toggle="modal" class="btn-td"  data-bs-target="#modal-table">  <img src="../images/icons8-visible-30.png" alt="View"></button></td>
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
    const { nameBook, amountBook, yearbook, authbook, postbook, genBook } =
      book[0]; // Destructurar la query.

    //Elementos del html
    const modalTitle = document.getElementById("modal-title"); // llamar modelo.
    const modalBody = document.getElementById("modal-body");

    modalBody.innerHTML = "";

    //Creacion de elemenetos para agregar en el modal
    const poster = document.createElement("div");
    const year = document.createElement("div");
    const amount = document.createElement("div");
    const auth = document.createElement("div");
    const gen = document.createElement("div");

    //Agregar el contenido a html
    poster.innerHTML = `<img class="post-book" src="${postbook}" alt="${nameBook}" onerror="this.onerror=null; this.src=' https://www.movienewz.com/wp-content/uploads/2014/07/poster-holder.jpg';">`;
    year.innerHTML = `<p class="fs-4 m-0"><b>Age:</b> ${yearbook}</p>`;
    amount.innerHTML = `<p class="fs-4 m-0"> <b>Amount:</b>${amountBook}</p>`;
    auth.innerHTML = `<p class="fs-4 mt-4 m-0"> <b>Auth:</b>${authbook}</p>`;
    gen.innerHTML = `<p class="fs-4 m-0"> <b>Gendre:</b>${genBook}</p>`;

    // Agregar al modal
    modalTitle.innerHTML = nameBook;
    modalBody.appendChild(poster);
    modalBody.appendChild(auth);
    modalBody.appendChild(gen);
    modalBody.appendChild(year);
    modalBody.appendChild(amount);

    //Update
    const btnUpdate = document.getElementById("btn-update");
    btnUpdate.addEventListener("click", async () => {
      await viewBook(idBook, book);
    });
  } catch (err) {
    console.log("hubo un error a mostrar el libro por el id ", err);
  }
}

// Funcion para actualizar
async function viewBook(idBook, book) {
  try {
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
    document.getElementById("inpt-nameBook").value = nameBook;
    document.getElementById("inpt-authBook").value = authbook;
    document.getElementById("inpt-yearBook").value = yearbook;
    document.getElementById("inpt-genBook").value = genBook;
    document.getElementById("inpt-amountBook").value = amountBook;
    document.getElementById("inpt-sumBook").value = sumBook;
    document.getElementById("inpt-postBook").value = postbook;
    const btnSaveUpdate = document.getElementById("btn-save_update");
    //Mostrar en el Html

    btnSaveUpdate.addEventListener('click',async() => {
     console.log('R PAPA');
      await updateBook(book, idBook)
    });
  } catch (err) {
    console.log(err);
  }
}

async function updateBook(body, idBook ) {
  console.log(body[0]);
  alert(body[0].sumBook)
    try{
     await fetch ('http://localHost:3000/admin/books/update',{
       method: 'PUT',
       headers:{
           'Content-Type':'application/json'
       },
      body: JSON.stringify({
      "idBook": idBook,
      "nameBook": body[0].nameBook,
      "yearbook": body[0].yearbook,
      "genBook":body[0].genBook,
      "amountBook":body[0].amountBook,
     "postbook":body[0].postbook,
     "authbook":body[0].authbook,
     "sumBook": body[0].sumBook
      })
     }).then(res=>{
      console.log(res.status);
     })

    }catch(err){
      console.log(errr)
    }
}
