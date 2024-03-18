import { createConnection } from "../Databases/config.js";
const connection =await createConnection();
export class adminMdl {

    // Modelo para obtener todos los libros de la bd.
    static async getBooks (){
        try{
        const [sql] = await connection.query(' SELECT BIN_TO_UUID(idBook) as idBook,nameBook, amountBook, genBook,  yearbook, authbook, disableBook, postbook, sumBook FROM book')
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
    // Actualizar libros
    static async updateBooks({body}){
        try{
            const {idBook, nameBook, yearbook, amountBook, postbook, sumBook, authbook, genBook, disableBook} = body;
            console.log(`id: ${idBook}, nameBook = ${nameBook}`)
          
            const sql = await connection.query('UPDATE book SET nameBook = ?, yearbook = ?,amountBook = ?,postbook=?, sumBook = ?, authbook = ?, genBook = ?, disableBook = ?   WHERE BIN_TO_UUID(idBook) = ?', [nameBook,yearbook,amountBook,postbook, sumBook, authbook, genBook,disableBook, idBook ]);
            return sql;
        }catch(err){
            console.log('Hubo un error al actualizar los libros.')
            throw err;
        }
    }
    // Crear Libros
    static async createBooks({body}){
            const { nameBook, yearbook, amountBook, postbook, sumBook, authbook, genBook } = body;
            console.log('Si se esta pasando algo')
            const sql = await connection.query('INSERT INTO book () VALUES')
    }
}