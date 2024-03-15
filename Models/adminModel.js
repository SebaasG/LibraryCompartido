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
            const [sql] = await connection.query('SELECT BIN_TO_UUID(idBook) as id,nameBook, amountBook, genBook, sumBook, yearbook, authbook, postbook FROM book WHERE BIN_TO_UUID(idBook) = ?',[idBook]);
            return sql;
        }catch(err){
            console.log('Hubo un error en la busqueda del libro');
            throw err;
        }
    }
    static async updateBooks({body}){
        try{
            const {
                nameBook,
                amountBook,
                yearbook,
                authbook,
                postbook,
                sumBook,
                genBook,
                idBook
              } = body;
            const sql = await connection.query('UPDATE book SET nameBook = Los fantasticos WHERE BIN_TO_UUID(idBook) = 6de3cb90-e155-11ee-a7d6-ec8eb55104fd')
        }catch(err){
            console.log('Hubo un error al actualizar los libros.')
            throw err;
        }
    }

}