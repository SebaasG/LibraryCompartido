import { createConnection } from '../Databases/config.js';

const connection = await createConnection();

export class bookModel {
    static async getBooks() {
        try {
            const [books] = await connection.query('SELECT BIN_TO_UUID(idBook) as id,nameBook, amountBook, genBook, sumBook, yearbook, authbook, postbook from book ');
            return books;
        } catch (error) {
            console.log('Modelo:', error);
            throw error; // Lanzar el error para manejarlo en el controlador
        }
    }


    static async postBook(body){
        try {

            const {nameBook,amountBook,genBook,sumBook,yearbook,authbook,postbook} = body
            const books = await connection.query("INSERT INTO book (nameBook, amountBook, genBook, sumBook, yearbook, authbook, postbook)VALUES (?,?,?,?,?,?,?)", [nameBook,amountBook,genBook,sumBook,yearbook,authbook,postbook])

            if(books){
                return 1
            }
            return books
        } catch (error) {
            
        }
    }
    static async getBookById(idBook){
        try{
            const [book] = await connection.query('SELECT BIN_TO_UUID(idBook) as id,nameBook, amountBook, genBook, sumBook, yearbook, authbook, postbook FROM book WHERE BIN_TO_UUID(idBook) = ?',[idBook]);
            return book;
        }catch(err){
            console.log('Hubo un error en la busqueda del libro');
            throw err;
        }
    }


    static async getBookByName(nameBook){
        try {
            const [book] = await connection.query('SELECT BIN_TO_UUID(idBook) as id, nameBook, amountBook, genBook, sumBook, yearbook, authbook, postbook FROM book WHERE nameBook LIKE ?', [`%${nameBook}%`]);
            return book;
        } catch(err) {
            console.log('Hubo un error en la búsqueda del libro');
            throw err;
        }
    }
    
}
