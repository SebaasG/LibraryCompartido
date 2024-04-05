const currentPage = document.body.dataset.page;
let idBook = localStorage.getItem("idBook");
let count = 0;

document.addEventListener("DOMContentLoaded", async () => {
  await getBooks(1);
});

async function getBooks(page) {
  const response = await fetch("http://localHost:3000/admin/books/" + page);
  const data = await response.json();
  let tableBody, tabs;
  const { tabsActive, tabsDisable, queryActive, queryDisable } = data;

  if (currentPage === "adminBooks") {
    tableBody = document.querySelector("#body-table_active");
    tabs = tabsActive;
    renderData(queryActive);
    await pagination(tabs, tableBody);
  } else {
    tableBody = document.querySelector("#body-table_disable");
    tabs = tabsDisable;
    renderData(queryDisable);
    await pagination(tabs, tableBody);
  }
}

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
          await disableBook(data);
        });
    } else {
      document
        .querySelector("#idBook" + count)
        .addEventListener("click", () => {
          localStorage.setItem("idBook", data.idBook);
         viewAndUpdateBooks(data,'viewBook');
        });
    }
  });
}

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
    } = data[0];

    const modalTitle = document.getElementById("modal-title");
    const modalBody = document.getElementById("modal-body");

    modalBody.innerHTML = "";

    const createDivText = (text) => {
      const div = document.createElement("div");
      div.innerHTML = text;
      return div;
    };
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

    modalTitle.innerHTML = nameBook;
    modalBody.append(poster, auth, gender, year, amount, sumary);
  } catch (err) {
    console.log("hubo un error a mostrar el libro por el id ", err);
  }
}

async function disableBook(data) {
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

function viewAndUpdateBooks(data, state) {
  try {
    if (state === "viewBook") {
      console.log('Esta pasando el viewBook')
      document.getElementById("inpt-nameBook").value = data.nameBook;
      document.getElementById("inpt-authBook").value = data.authbook;
      document.getElementById("inpt-yearBook").value = data.yearbook;
      document.getElementById("inpt-amountBook").value = data.amountBook;
      document.getElementById("inpt-sumBook").value = data.sumBook;
      document.getElementById("inpt-postBook").value = data.postbook;
      document.getElementById("inpt-stateBook").value = data.disableBook;

      const btnSaveUpdate = document.querySelector("#btn-save_update");
      btnSaveUpdate.addEventListener('click',async()=>{
          await updateBooks();
      })
    }

    async function updateBooks() {
      console.log('Esta pasando el viewBook')

      let genBook = await updateInput();
      await updateInput();
      const nameBook = document.getElementById("inpt-nameBook").value;
      const authbook = document.getElementById("inpt-authBook").value;
      const yearbook = document.getElementById("inpt-yearBook").value;
      const amountBook = document.getElementById("inpt-amountBook").value;
      const sumBook = document.getElementById("inpt-sumBook").value;
      const postbook = document.getElementById("inpt-postBook").value;
      const disableBook = document.getElementById("inpt-stateBook").value;

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
      });
    }
  } catch (e) {
    console.log(e);
  }
}

async function updateInput() {
  const input = document.getElementById("genderview");
  const select = document.getElementById("select-gender");
  genBook = Array.from(select.selectedOptions)
    .map((option) => option.value)
    .join(",")
    .replace(/\s/g, "");
  input.value = genBook;
  return genBook;
}

// Search Books
let table, input, notFoundIcon, page;
if (currentPage === "adminBooks") {
  
  table = document.querySelector('#body-table_active');
  input = document.querySelector("#inputSearchBookActive");
  notFoundIcon = document.querySelector("#notFoundActive");
  page= 1;

  input.addEventListener("input", async () => {
    await searchBooks(input, table, notFoundIcon, page);
  });
} else {
  table = document.querySelector('#body-table_disable');
  input = document.querySelector("#inputSearchBookDisable");
  notFoundIcon = document.querySelector("#notFoundDisable");
  page = 2;

  input.addEventListener("input", async () => {
    await searchBooks(input, table, notFoundIcon, page);
  });
}

async function searchBooks(input, table, notFound, page){
  const searchBy = document.getElementById("searchBoook").value;
  input = input.value;

  table.innerHTML = '';
  if(input === ''){
    window.location.reload();
    await getBooks();
  }else{
    const response = await fetch(
      `http://localHost:3000/admin/books/shearchBook/${searchBy}/${input}/${page}`
    );
    const data = await response.json();
    console.log(`Data que se esta trayendo ${data}`)
    if (input.length > 0 && data.length > 0) {
      renderData(data);
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

