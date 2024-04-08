
document.addEventListener('DOMContentLoaded', async()=>{
    await getTrasacData(1);
})

 async function getTrasacData(page){

    const response = await fetch(`http://localhost:3000/admin/books/history/${page}`)
    const dataResponse = await response.json();
    const {data, tabs} = dataResponse;

}

