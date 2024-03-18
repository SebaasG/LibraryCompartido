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
      
        if(data.disableBook === 2){
          tr.innerHTML = `
                <td>${data.nameBook}</td>
                <td>${data.genBook}</td>
                <td>${data.yearbook}</td>
                <td>${data.authbook}</td>
                <td>${data.amountBook}</td>
                <td class="container-td_buttons"><button title="Edit/Update" id="idBook${count}" class="btn-td1"  data-bs-toggle="modal"  data-bs-target="#modal-update_book">  <img src="../images/icons8-pluma-30.png" alt="View"></button></td>
               `;
          tableBody.appendChild(tr);
          document
            .querySelector("#idBook" + count)
            .addEventListener("click", async () => {
              localStorage.setItem("idBook", data);
              // await getBooksById(localStorage.setItem('idBook', data.idBook));
                console.log(data);
                await viewBook(data.idBook, data)
            });
          
          }
          });
    } catch (err) {
      console.log("No sirve");
    }
  }
// Funcion para actualizar
async function viewBook(idBook, book) {
    try {
        console.log(idBook)
        console.log(book.nameBook)
      const {
        nameBook,
        amountBook,
        yearbook,
        authbook,
        postbook,
        sumBook,
        genBook,
        disableBook
      } = book;
      console.log(book.sumBook)
     
      //Llamar form
      document.getElementById("inpt-nameBook").value = nameBook;
      document.getElementById("inpt-authBook").value = authbook;
      document.getElementById("inpt-yearBook").value = yearbook;
      document.getElementById("inpt-genBook").value = genBook;
      document.getElementById("inpt-amountBook").value = amountBook;
      document.getElementById("inpt-sumBook").value = sumBook;
      document.getElementById("inpt-postBook").value = postbook;
      document.getElementById("inpt-stateBook").value = disableBook;
      const btnSaveUpdate = document.getElementById("btn-save_update");
      //Mostrar en el Html
  
      btnSaveUpdate.addEventListener('click',async() => {
       console.log('R PAPA');
        await updateBook( idBook)
      });
    } catch (err) {
      console.log(err);
    }
  }
  
  async function updateBook( idBook ) {
    // console.log(body[0]);
    // alert(body[0].sumBook)
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
        "idBook": idBook,
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
  