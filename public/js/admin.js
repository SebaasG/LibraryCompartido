document.addEventListener("DOMContentLoaded", async () => {
  const currentPage = document.body.dataset.page;
  if (currentPage === "adminBooks") {
    await getBooks(1);
  } else {
    await getBooks();
  }
});
let count = 0;
let idBook = localStorage.getItem("idBook");

//Obtener todos los libros cuando se cargue la pagina.
async function getBooks(n) {
  try {
    const response = await fetch("http://localHost:3000/admin/books");
    const data = await response.json();

    const tableBodyActive = document.getElementById("body-table_active");
    const tableBodyDisable = document.getElementById("body-table_disable");

    data.forEach((data) => {
      const tr = document.createElement("tr");
      count++;
      if (n) {
        if (data.disableBook === 1) {
          tr.innerHTML = `
                    <td>${data.nameBook}</td>
                    <td>${data.genBook}</td>
                    <td>${data.yearbook}</td>
                    <td>${data.authbook}</td>
                    <td>${data.amountBook}</td>
                    <td class="container-td_buttons"><button title="View" id="idBook${count}" data-bs-toggle="modal" class="btn-td1"  data-bs-target="#modal-table">  <img src="../images/icons8-visible-30.png" alt="View"></button>
            
                    <button title="Disabled" id="btn-update${count}" class="btn-td2" >  <img src="../images/icons8-x-30.png" alt="Disabled"></button></td>
                   `;
          tableBodyActive.appendChild(tr);
          document
            .querySelector("#idBook" + count)
            .addEventListener("click", async () => {
              localStorage.setItem("idBook", data.idBook);
              // await getBooksById(localStorage.setItem('idBook', data.idBook));

              await getBooksById(data.idBook);
            });
          document
            .getElementById("btn-update" + count)
            .addEventListener("click", async () => {
              console.log("Si se esta habilitando");
              data.disableBook = 2;
              data.idBook = data.idBook;
              await updateBook(data);
            });
        }
      } else {
        if (data.disableBook === 2) {
          tr.innerHTML = `
                <td>${data.nameBook}</td>
                <td>${data.genBook}</td>
                <td>${data.yearbook}</td>
                <td>${data.authbook}</td>
                <td>${data.amountBook}</td>
                <td class="container-td_buttons"><button title="Edit/Update" id="idBook${count}" class="btn-td1"  data-bs-toggle="modal"  data-bs-target="#modal-update_book">  <img src="../images/icons8-pluma-30.png" alt="View"></button></td>
               `;
          tableBodyDisable.appendChild(tr);
          document
            .querySelector("#idBook" + count)
            .addEventListener("click", async () => {
              localStorage.setItem("idBook", data);
              // await getBooksById(localStorage.setItem('idBook', data.idBook));
              data.idBook = data.idBook;
              await viewBook(data);
            });
        }
      }
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
      sumBook,
    } = book[0]; // Destructurar la query.

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
    const sumary = document.createElement("div");

    //Agregar el contenido a html
    poster.innerHTML = `<img class="post-book" src="${postbook}" alt="${nameBook}" onerror="this.onerror=null; this.src=' https://www.movienewz.com/wp-content/uploads/2014/07/poster-holder.jpg';">`;
    year.innerHTML = `<p class="fs-4 m-0"><b>Age:</b> ${yearbook}</p>`;
    amount.innerHTML = `<p class="fs-4 m-0"> <b>Amount:</b>${amountBook}</p>`;
    auth.innerHTML = `<p class="fs-4 mt-4 m-0"> <b>Auth:</b>${authbook}</p>`;
    gen.innerHTML = `<p class="fs-4 m-0"> <b>Gendre:</b>${genBook}</p>`;
    sumary.innerHTML = `<p class="fs-4 m-0"> <b>Sumary:</b>${sumBook}</p>`;

    // Agregar al modal
    modalTitle.innerHTML = nameBook;
    modalBody.appendChild(poster);
    modalBody.appendChild(auth);
    modalBody.appendChild(gen);
    modalBody.appendChild(year);
    modalBody.appendChild(amount);
    modalBody.appendChild(sumary);
  } catch (err) {
    console.log("hubo un error a mostrar el libro por el id ", err);
  }
}

// Funcion que actualiza

async function updateBook( data ) {
      try{
       await fetch ('http://localHost:3000/admin/books/update',{
         method: 'PUT',
         headers:{
             'Content-Type':'application/json'
         },
        body: JSON.stringify({
        "idBook": data.idBook,
        "nameBook":data.nameBook,
        "yearbook": data.yearbook,
        "genBook": data.genBook,
        "amountBook":data.amountBook,
       "postbook":data.postbook,
       "authbook":data.authbook,
       "sumBook": data.sumBook,
       "disableBook": data.disableBook
        })
       }).then(res=>{
        console.log(res.status);
        window.location.reload();

       })
  
      }catch(err){
        console.log(errr)
      }
  }
  async function updateBookDisable( data ) {
   
    const nameBook = document.getElementById("inpt-nameBook").value;
    const authbook =  document.getElementById("inpt-authBook").value;
    const yearbook = document.getElementById("inpt-yearBook").value ;
    const genBook =  document.getElementById("inpt-genBook").value;
    const amountBook =  document.getElementById("inpt-amountBook").value ;
    const sumBook = document.getElementById("inpt-sumBook").value;
    const postbook =  document.getElementById("inpt-postBook").value;
    const disableBook = document.getElementById("inpt-stateBook").value;

      try{
       await fetch ('http://localHost:3000/admin/books/update',{
         method: 'PUT',
         headers:{
             'Content-Type':'application/json'
         },
        body: JSON.stringify({
        "idBook": data.idBook,
        "nameBook":nameBook,
        "yearbook": yearbook,
        "genBook": genBook,
        "amountBook":amountBook,
       "postbook":postbook,
       "authbook":authbook,
       "sumBook": sumBook,
       "disableBook": disableBook
        })
       }).then(res=>{
        console.log(res.status);
       })
  
      }catch(err){
        console.log(errr)
      }
  }
  
async function viewBook(data) {
    try {
          
      //Llamar form
      document.getElementById("inpt-nameBook").value = data.nameBook;
      document.getElementById("inpt-authBook").value = data.authbook;
      document.getElementById("inpt-yearBook").value = data.yearbook;
      document.getElementById("inpt-genBook").value = data.genBook;
      document.getElementById("inpt-amountBook").value = data.amountBook;
      document.getElementById("inpt-sumBook").value = data.sumBook;
      document.getElementById("inpt-postBook").value = data.postbook;
      document.getElementById("inpt-stateBook").value = data.disableBook;
      const btnSaveUpdate = document.getElementById("btn-save_update");
      //Mostrar en el Html
  
      btnSaveUpdate.addEventListener('click',async() => {
       console.log('R PAPA');
        await updateBookDisable( data)
      });
    } catch (err) {
      console.log(err);
    }
  }