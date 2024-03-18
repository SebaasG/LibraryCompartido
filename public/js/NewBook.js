const newBookBtn = document.getElementById('btn-newBook');

newBookBtn.addEventListener('click', async()=>{
console.log('R')
    await createBook();
})

async function createBook(){
        console.log('AÑAÑAi')
        try{
            const nameBook = document.getElementById("inpt-nameBook").value;
            const authbook =  document.getElementById("inpt-authBook").value;
            const yearbook = document.getElementById("inpt-yearBook").value ;
            const genBook =  document.getElementById("inpt-genBook").value;
            const amountBook =  document.getElementById("inpt-amountBook").value ;
            const sumBook = document.getElementById("inpt-sumBook").value;
            const postbook =  document.getElementById("inpt-postBook").value;

            await fetch('http://localhost:3000/admin/books/create',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
               body: JSON.stringify({
               nameBook: nameBook,
               authbook:authbook,
               yearbook:yearbook,
               genBook:genBook,
               amountBook:amountBook,
               sumBook:sumBook,
               postbook:postbook
               })
            }).then(res => {
                document.location.reload()
            }).catch(err =>{
                console.log(`Hubo un error ${err}`)
            })

        }catch(err){
            console.log(err)
            throw err;
        }
}