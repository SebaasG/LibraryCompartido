const backButton = document.getElementById('btnbackData');
backButton.addEventListener('click', () => {
    window.location.href = '../views/booksIndex.html'
})

document.addEventListener('DOMContentLoaded', function () {

 
    getUser();
    renderData();
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



async function renderData(){
    const emailUser = localStorage.getItem('correo');
    const response = await fetch('http://localhost:3000/book/user/' + emailUser);
    const datos = await response.json();
    docUser = datos[0].docUser;

    console.log(datos[0].docUser)
const responseData = await fetch(`http://localHost:3000/book/get/transac/${docUser}`)
const data  = await responseData.json()

const bodyTable = document.getElementById("ContenTableInfo")
console.log(data)


bodyTable.innerHTML = "";
let contador = 0;

data.forEach((d) =>{
   contador = contador +1
    const tr = document.createElement("tr")
    let type ;
    if (d.TypeTrans ===2){
        type = "Loan"
    }else{
        type = "Refund"
    }
    tr.innerHTML = `
   <td class= ""> ${contador} </td>
    <td class= ""> ${type} </td>
    <td class= ""> ${d.nameBook} </td>
    <td class= ""> ${d.date} </td>
    `
    bodyTable.appendChild(tr)
})

}



