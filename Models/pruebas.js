// // import { createConnection } from "../Databases/config.js";

// // const connection = await createConnection();
// // // console.log(`connection: ${ connection}`)
// // // async function verifyExistenceUser ({body}){
// // //     const {docUser, emailUser} = body;
// // //     console.log(`Documento: ${docUser}, Email: ${emailUser}`);
// // //     const [result] = await connection.query( "CALL verifyExistenceUser(1095299063, 'andreyvr07@gmail.comm');");
// // //     return result
// // //     }


// // const body ={
// //     "docUser":123456789,
// //     "nameUser":"Andrey",
// //     "emailUser":"Andrey@example.com",
// //     "passUser":"12345",
// //     "phoneUser":3219567693,
// //     "addressUser":"Piedecuesta-Santander"
// // }

// // // const result = await verifyExistenceUser({body});

// // // console.log(`Resultado de la query:${result}`);


// // // Segundo metodo

// // const verifyUserExtence = async ({body})=>{
// //     const {docUser, emailUser} = body;
// //     // console.log(`Documento: ${docUser}, Email: ${emailUser}`);

// //     const [sql] = await connection.query('SELECT docUser, emailUser FROM user WHERE docUser=? AND emailUser=?',[docUser, emailUser]);
// //     console.log('Hableme que esto sirve hp',sql[0])
// //     return sql;
// // }

// // const result =await verifyUserExtence({body});
// // if(!result[0]){
// //      console.log(result[0]);
// //     console.log('NO');
// // }else{
// //     console.log('ok');
// // }



// // Prueba

// const response = ('El usuario ya esta registrado');
// app.post('/prueba',async(req,res)=>{
//     try {
//         if(req.body.mensaje){
//             console.log(req.body.mensaje)
//             const script = `
//             <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
//             <script>
//                 Swal.fire({
//                 position: "center",
//                 icon: "success",
//                 title: "Your work has been saved",
//                 showConfirmButton: false,
//                 timer: 1500
//               });
//             </script>
//           `;
//           console.log(script)
//           res.send(script);  
//         }
//     }catch(err){
//         console.log('Hubo un error');
//         res.status(404).json({message:'Hubo un error mi papá'});
//     }
  
// })




import express from 'express';
import bodyParser from 'body-parser';
import Swal from 'sweetalert2'

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/mensaje',(req,res)=>{
    try{
        console.log(req.body)
        const {mensaje} = req.body;
            console.log(mensaje);
            res.status(200).send('R');
    }catch(err){
        console.log(err)
        res.send('CHupelo loca');
    }

})

app.listen(3000,()=>{
    console.log('Server on port http://localhost:3000/mensaje');
})






