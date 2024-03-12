import { createConnection } from "../Databases/config.js";

const connection = await createConnection();
// console.log(`connection: ${ connection}`)
// async function verifyExistenceUser ({body}){
//     const {docUser, emailUser} = body;
//     console.log(`Documento: ${docUser}, Email: ${emailUser}`);
//     const [result] = await connection.query( "CALL verifyExistenceUser(1095299063, 'andreyvr07@gmail.comm');");
//     return result
//     }


const body ={
    "docUser":123456789,
    "nameUser":"Andrey",
    "emailUser":"Andrey@example.com",
    "passUser":"12345",
    "phoneUser":3219567693,
    "addressUser":"Piedecuesta-Santander"
}

// const result = await verifyExistenceUser({body});

// console.log(`Resultado de la query:${result}`);


// Segundo metodo

const verifyUserExtence = async ({body})=>{
    const {docUser, emailUser} = body;
    // console.log(`Documento: ${docUser}, Email: ${emailUser}`);

    const [sql] = await connection.query('SELECT docUser, emailUser FROM user WHERE docUser=? AND emailUser=?',[docUser, emailUser]);
    console.log('Hableme que esto sirve hp',sql[0])
    return sql;
}

const result =await verifyUserExtence({body});
if(!result[0]){
     console.log(result[0]);
    console.log('NO');
}else{
    console.log('ok');
}

