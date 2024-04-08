document.addEventListener("DOMContentLoaded", async () => {
  await getTransacData(1);
});

async function getTransacData(page) {
  const response = await fetch(
    `http://localhost:3000/admin/books/history/${page}`
  );
  const dataResponse = await response.json();
  const { data, tabs } = dataResponse;

  pagination(tabs);
  renderData(data);
}

function pagination(tabs) {
  const containerTabs = document.querySelector("#pagination");

  containerTabs.innerHTML = "";
  for (let i = 1; i <= tabs; i++) {
    const li = document.createElement("li");
    li.classList.add("page-item");

    li.innerHTML = ` <a  id ="page${i}"  class="page-link" >${i}</a> `;
    containerTabs.appendChild(li);

    const page = document.querySelector(`#page${i}`);
    page.addEventListener("click", async () => {
      console.log("epa", i);
      await getTransacData(i);
    });
  }
}

function renderData(data) {
  const bodyTable = document.querySelector("#body-table");
  console.log(data);
  bodyTable.innerHTML = "";

  data.forEach((d) => {
    const tr = document.createElement("tr");
    let date = new Date(d.dateTrans);
    let newDate = date.toLocaleDateString("es-ES");
    let newHour = date.toLocaleTimeString("es-ES");
    tr.innerHTML = `
        <td class="" >${d.nameType} </td>
        <td class="" >${d.nameUser} </td>
        <td class="" >${d.nameBook} </td>
        <td class="" >${newDate} </td>
        <td class="" >${newHour} </td>
        `;
    bodyTable.appendChild(tr);
  });
}

const inputSearch = document.querySelector("#inputSearch");
inputSearch.addEventListener("input", async () => {
  await searchTransac();
});
async function searchTransac() {
  const inputSearch = document.querySelector("#inputSearch").value;
  const selectType = document.querySelector("#selectType").value;
  const selectFilter = document.querySelector("#selectFilter").value;

    console.log(selectFilter, selectType)

  const tableBody = document.querySelector('#body-table');
  tableBody.innerHTML = '';   
  if(inputSearch === ''){
    await getTransacData(1);

  }else{
      const response = await fetch(`http://localhost:3000/admin/books/history/search/${selectType}/${selectFilter}/${inputSearch}`)
      const data = await response.json();
      await renderData(data);

  }
}
