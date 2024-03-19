
const inptSearch = document.getElementById('inputSearchBook');

inptSearch.addEventListener('input',async()=>{
   await shearchBy()
})

async function shearchBy(){
    const searchBy = document.getElementById('searchBoook').value;
    const inptSearch = document.getElementById('inputSearchBook').value
    try{
        // Fetch
        const response = await fetch(`http://localHost:3000/admin/books/shearchBook/${searchBy}/${inptSearch}`);
        const data = response.json();
        //Agregar elementos al html
        const tableBodyActive = document.getElementById("body-table_active");
        const tableBodyDisable = document.getElementById("body-table_disable");
        tableBodyActive.innerHTML = '';
        tableBodyDisable.innerHTML = '';
        
        const tr = document.createElement('tr');
        console.log(data)
        data.forEach(data => {
            if(data.disableBook === 1){
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
            }else{
                tr.innerHTML = `
                <td>${data.nameBook}</td>
                <td>${data.genBook}</td>
                <td>${data.yearbook}</td>
                <td>${data.authbook}</td>
                <td>${data.amountBook}</td>
                <td class="container-td_buttons"><button title="Edit/Update" id="idBook${count}" class="btn-td1"  data-bs-toggle="modal"  data-bs-target="#modal-update_book">  <img src="../images/icons8-pluma-30.png" alt="View"></button></td>
               `;
               tableBodyDisable.appendChild(tr);
            }
        });

    }catch(err){
        console.log('Hubo un error en el fetch a traer los archivos.')
        
    }
    

    // modalBody.innerHTML = "";
}

