const backButton = document.getElementById('btnbackData');
backButton.addEventListener('click', () => {
    window.location.href = '../views/booksIndex.html'
})


const loanButton = document.getElementById('option2');
loanButton.addEventListener('click', () => {
    dataOfTable(2);
})

const historyButton = document.getElementById("option1")

historyButton.addEventListener('click', () =>{
    dataOfTable(1);
})



document.addEventListener('DOMContentLoaded', function () {
    getUser();
    dataOfTable(1);
});

function selectUnderline(elemento) {
    // Obtén todos los elementos con la clase 'optionTittleNav'
    var elementos = document.querySelectorAll('.optionTittleNav');

    // Remueve la clase 'seleccionado' de todos los elementos
    elementos.forEach(function (el) {
        el.classList.remove('selectElement');
    });

    // Añade la clase 'seleccionado' al elemento actual
    elemento.classList.add('selectElement');
}


async function getUser() {
    const emailUser = localStorage.getItem('correo');
    const response = await fetch('http://localhost:3000/book/user/' + emailUser);
    const datos = await response.json();

    const nameUser = document.getElementById('nameUser');

    nameUser.innerHTML = '';

    const nameContainer = document.createElement('p');
    nameContainer.innerHTML = `<strong>Bienvenid@ ${datos[0].nameUser}</strong>`;

    nameUser.appendChild(nameContainer);
}


async function dataOfTable(typeP) {
    const emailUser = localStorage.getItem('correo');
    const response = await fetch('http://localhost:3000/book/user/' + emailUser);
    const datos = await response.json();
    docUser = datos[0].docUser;
    let parameter = typeP;
    let opheader1;
    let opheader2;
    let opheader3;

    if (typeP === 1) {
        opheader1 = "Type"
        opheader2 = "Name"
        opheader3 = "Date"
    } else {
        opheader1 = "Name"
        opheader2 = "Date Out"
        opheader3 = "Date limit"
    }

    const responseData = await fetch(`http://localHost:3000/book/get/transac/${parameter}/${docUser}`)
    const data = await responseData.json()
    const tableHeader = document.getElementById("ContentHeader")
    const bodyTable = document.getElementById("ContenTableInfo")
    tableHeader.innerHTML = "";
    const th = document.createElement("tr")
    th.innerHTML = `
    <th scope="col">#</th>
    <th scope="col">${opheader1}</th>
    <th scope="col">${opheader2}</th>
    <th scope="col">${opheader3}</th>
    `
    tableHeader.appendChild(th);

    bodyTable.innerHTML = "";
    let contador = 0;
    let type;
    data.forEach((d) => {
        contador = contador + 1
        const tr = document.createElement("tr")
        console.log(d.option1)
        if (d.option1 === 2) {
            type = "Loan"
        } else if (d.option1 === 3) {
            type = "Refund"
        } else {
            type = d.option1
        }
        tr.innerHTML = `
    <td class= ""> ${contador} </td>
    <td class= ""> ${type} </td>
    <td class= ""> ${d.option2} </td>
    <td class= ""> ${d.option3} </td>
    `
        bodyTable.appendChild(tr)

    })
}


