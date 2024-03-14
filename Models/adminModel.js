import { createConnection } from "../Databases/config.js";
const connection =await createConnection();
export class adminMdl {

    // Modelo para obtener todos los libros de la bd.
    static async getBooks (){
        try{
        const [sql] = await connection.query(' SELECT BIN_TO_UUID(idBook) as idBook,nameBook, amountBook, genBook,  yearbook, authbook FROM book')
        return sql;
        }catch(err){
            console.log('Hubo un error en el modelo.', err);
            throw err;
        }
    }   
    // Modelo para obtener un libro por id.
    static async getBookById(idBook){
        try{
            console.log(`Este es lo que esta trayendo como parametro: ${idBook}`);
            const [sql] = await connection.query('SELECT BIN_TO_UUID(idBook) as id,nameBook, amountBook, genBook, sumBook, yearbook, authbook, postbook FROM book WHERE BIN_TO_UUID(idBook) = ?',[idBook]);
            console.log(`Esto es lo que me esta trayendo la query ${sql}`)
            return sql;
        }catch(err){
            console.log('Hubo un error en la busqueda del libro');
            throw err;
        }
    }

}