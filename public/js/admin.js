let count = 0;
const currentPage = document.body.dataset.page;
let idBook = localStorage.getItem("idBook");
document.addEventListener("DOMContentLoaded", async () => {
  await getBooks(1);
});

// Traer Libros
async function getBooks(page) {
  const response = await fetch("http://localHost:3000/admin/books/" + page);
  const data = await response.json();
  let tableBody, tabs;
  //Desctructurar respuesta
  const { tabsActive, tabsDisable, queryActive, queryDisable } = data;
  
  if (currentPage === "adminBooks") {
    tableBody = document.querySelector('#body-table_active');
    tabs = tabsActive
    renderData(queryActive);
    await pagination(tabs, tableBody);
  } else {
    tableBody = document.querySelector('#body-table_disable');
    tabs = tabsDisable
    renderData(queryDisable);
    await pagination(tabs, tableBody);
  }
}

// Funcion donde se va crear la paginacion
async function pagination(tabs, tableBody) {
  if (!Number.isInteger(tabs)) {
    tabs = Math.ceil(tabs);
  }
  const container = document.getElementById("pagination");

  container.innerHTML = "";

  // Cracion de pestañas con su valor
  for (let i = 1; i <= tabs; i++) {
    const li = document.createElement("li");
    li.classList.add("page-item");
    li.innerHTML = ` <a  id ="page${i}"  class="page-link" >${i}</a> `;

    container.appendChild(li);
    const page = document.querySelector("#page" + i);
    page.addEventListener("click", async () => {
        tableBody.innerHTML = "";
        await getBooks(i);
    });
  }
}

//Contenido de la tabla y funcionalidades
function renderData(data) {
  let tdButtons, tableBody;

  data.forEach((data) => {
    const tr = document.createElement("tr");
    count++;

    if (currentPage === "adminBooks") {
      tableBody = document.getElementById("body-table_active");

      tdButtons = ` <td class="container-td_buttons">
      <button title="View" id="idBook${count}" data-bs-toggle="modal" class="btn-td1"  data-bs-target="#modal-table">
      <img src="../images/icons8-visible-30.png" alt="View">
      </button>
      <button title="Disabled" id="btn-update${count}" class="btn-td2">
      <img src="../images/icons8-x-30.png" alt="Disabled">
      </button>
      </td>`;
    } else {
      tableBody = document.getElementById("body-table_disable");

      tdButtons = `
      <td class="container-td_buttons">
            <button title="Edit/Update" id="idBook${count}" class="btn-td1"  data-bs-toggle="modal"  data-bs-target="#modal-update_book">
                <img src="../images/icons8-pluma-30.png" alt="View">
            </button>
        </td>`;
    }

    tr.innerHTML = `
      <td>${data.nameBook}</td>
      <td>${data.yearbook}</td>
      <td>${data.authbook}</td>
      <td>${data.amountBook}</td>
     ${tdButtons}
      `;
    tableBody.appendChild(tr);

    if (currentPage === "adminBooks") {
      document
        .querySelector("#idBook" + count)
        .addEventListener("click", async () => {
          localStorage.setItem("idBook", data.idBook);
          await getBooksById(data.idBook);
        });
      document
        .getElementById("btn-update" + count)
        .addEventListener("click", async () => {
          data.disableBook = 2;
          await updateBook(data);
        });
    } else {
      document
        .querySelector("#idBook" + count)
        .addEventListener("click", async () => {
          localStorage.setItem("idBook", data.idBook);
          await viewBook(data);
        });
    }
  });
}

// Funcion para traer los datos al modal
async function getBooksById(idBook) {
  const response = await fetch(
    `http://localHost:3000/admin/books/getById/${idBook}`
  );
  const data = await response.json();
  try {
    const {
      nameBook,
      amountBook,
      yearbook,
      authbook,
      postbook,
      genBook,
      sumBook,
    } = data[0]; // Destructurar la query.

    //Elementos del html
    const modalTitle = document.getElementById("modal-title"); // llamar modelo.
    const modalBody = document.getElementById("modal-body");

    modalBody.innerHTML = "";
    //Creacion de elemenetos para agregar en el modal
    const createDivText = (text) => {
      const div = document.createElement("div");
      div.innerHTML = text;
      return div;
    };
    //Agregar el contenido a html
    const poster = createDivText(
      `<img class="post-book" src="${postbook}" alt="${nameBook}" onerror="this.onerror=null; this.src=' https://www.movienewz.com/wp-content/uploads/2014/07/poster-holder.jpg';">`
    );
    const year = createDivText(
      `<p class="fs-4 m-0"><b>Age:</b> ${yearbook}</p>`
    );
    const amount = createDivText(
      `<p class="fs-4 m-0"> <b>Amount:</b>${amountBook}</p>`
    );
    const auth = createDivText(
      `<p class="fs-4 mt-4 m-0"> <b>Auth:</b>${authbook}</p>`
    );
    const gender = createDivText(
      `<p class="fs-4 m-0"> <b>Gender:</b>${genBook}</p>`
    );
    const sumary = createDivText(
      `<p class="fs-4 m-0"> <b>Sumary:</b>${sumBook}</p>`
    );

    // Agregar al modal
    modalTitle.innerHTML = nameBook;
    modalBody.append(poster, auth, gender, year, amount, sumary);
  } catch (err) {
    console.log("hubo un error a mostrar el libro por el id ", err);
  }
}

// Funcion que actualiza

async function updateBook(data) {
  try {
    await fetch("http://localHost:3000/admin/books/disableBook", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      window.location.reload();
    });
  } catch (err) {
    console.log(errr);
  }
}
async function updateBookDisable(data) {
  const input = document.getElementById("genderview");
  const select = document.getElementById("select-gender");
  let genBook;
  await actualizarInput();
  const nameBook = document.getElementById("inpt-nameBook").value;
  const authbook = document.getElementById("inpt-authBook").value;
  const yearbook = document.getElementById("inpt-yearBook").value;
  const amountBook = document.getElementById("inpt-amountBook").value;
  const sumBook = document.getElementById("inpt-sumBook").value;
  const postbook = document.getElementById("inpt-postBook").value;
  const disableBook = document.getElementById("inpt-stateBook").value;
  async function actualizarInput() {
    genBook = Array.from(select.selectedOptions)
      .map((option) => option.value)
      .join(",")
      .replace(/\s/g, "");
    input.value = genBook;
  }
  try {
    await fetch("http://localHost:3000/admin/books/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idBook: data.idBook,
        nameBook: nameBook,
        yearbook: yearbook,
        genBook: genBook,
        amountBook: amountBook,
        postbook: postbook,
        authbook: authbook,
        sumBook: sumBook,
        disableBook: disableBook,
      }),
    }).then((res) => {
      console.log(res.status);
    });
  } catch (err) {
    console.log(errr);
  }
}

async function viewBook(data) {
  try {
    //Llamar form
    document.getElementById("inpt-nameBook").value = data.nameBook;
    document.getElementById("inpt-authBook").value = data.authbook;
    document.getElementById("inpt-yearBook").value = data.yearbook;
    document.getElementById("inpt-amountBook").value = data.amountBook;
    document.getElementById("inpt-sumBook").value = data.sumBook;
    document.getElementById("inpt-postBook").value = data.postbook;
    document.getElementById("inpt-stateBook").value = data.disableBook;

    const btnSaveUpdate = document.getElementById("btn-save_update");
    //Mostrar en el Html

    btnSaveUpdate.addEventListener("click", async () => {
      await updateBookDisable(data);
    });
  } catch (err) {
    console.log(err);
  }
}

if (currentPage === "adminBooks") {
  // Search in Books Active
  const inputSearchActive = document.getElementById("inputSearchBookActive");
  inputSearchActive.addEventListener("input", async () => {
    await searchBooksActive();
  });
} else {
  // Search in Books Disable
  const inptSearchDisable = document.getElementById("inputSearchBookDisable");
  inptSearchDisable.addEventListener("input", async () => {
    await searchBooksDisable();
  });
}

// Function Search in Books Active.

async function searchBooksActive() {
  const searchBy = document.getElementById("searchBoook").value;
  const inputSearchActive = document.getElementById(
    "inputSearchBookActive"
  ).value;
  const tableBodyActive = document.getElementById("body-table_active");
  const notFound = document.getElementById("notFoundActive");

  tableBodyActive.innerHTML = "";
  if (inputSearchActive === "") {
    window.location.reload();
    await getBooks();
  } else {
    const response = await fetch(
      `http://localHost:3000/admin/books/shearchBook/${searchBy}/${inputSearchActive}/1`
    );
    const data = await response.json();
    console.log(data);
    if (inputSearchActive.length > 0 && data.length > 0) {
      const newData = { queryActive: data };
      renderData(newData);
      notFound.innerHTML = "";
    } else {
      const div = document.createElement("div");
      notFound.innerHTML = "";
      div.innerHTML = `   
        <img class="d-flex justify-content-center " src="../images/404image.png" alt="Not Found">
        <h2><b>Caracter Not Found 404</b></h2>
        `;
      notFound.appendChild(div);
    }
  }
}
//Function Search in Books Disable.

async function searchBooksDisable() {
  const searchBy = document.getElementById("searchBoook").value;
  const inptSearchDisable = document.getElementById(
    "inputSearchBookDisable"
  ).value;
  const tableBodyDisable = document.getElementById("body-table_disable");
  const notFound = document.getElementById("notFoundDisable");

  tableBodyDisable.innerHTML = "";

  if (inptSearchDisable === "") {
    window.location.reload();
    await getBooks();
  } else {
    const response = await fetch(
      `http://localHost:3000/admin/books/shearchBook/${searchBy}/${inptSearchDisable}/2`
    );
    const data = await response.json();
    if (inptSearchDisable.length > 0 && data.length > 0) {
      const newData = { queryDisable: data };
      renderData(newData);
      notFound.innerHTML = "";
    } else {
      const div = document.createElement("div");
      notFound.innerHTML = "";
      div.innerHTML = `   
        <img class="d-flex justify-content-center " src="../images/404image.png" alt="Not Found">
        <h2><b>Caracter Not Found 404</b></h2>
        `;
      notFound.appendChild(div);
    }
  }
}
