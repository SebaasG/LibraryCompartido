import { createConnection } from '../Databases/config.js';

const connection = await createConnection();

export class bookModel {
    static async getBooks() {
        try {
            const [books] = await connection.query('SELECT * FROM book');
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

}
