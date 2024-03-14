document.addEventListener("DOMContentLoaded", async () => {
  await getBooks();
});
let count = 0;
let idBook = localStorage.getItem("idBook");
async function getBooks() {
  try {
    const response = await fetch("http://localHost:3000/admin/books");
    const data = await response.json();

    const tableBody = document.getElementById("body-table");
    console.log(data.nameBook);
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

async function getBooksById(idBook) {
  console.log(`Este es el id:${idBook}`);

  const response = await fetch(`http://localHost:3000/admin/books/${idBook}`);
  const book = await response.json();
  try{
    console.log(book);
  }catch(err){
    console.log('hubo un error a mostrar el libro por el id ',err);
  }
}
