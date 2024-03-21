import { createConnection } from '../Databases/config.js';

const connection = await createConnection();
export class bookModel {
    static async getBooks() {
        try {
            const [books] = await connection.query("SELECT BIN_TO_UUID(b.idBook) AS id, b.nameBook, b.amountBook, GROUP_CONCAT(g.nameGen SEPARATOR ', ') AS genBook, b.sumBook, b.yearbook, b.authbook, b.postbook, b.disableBook FROM book b JOIN genderBook gb ON b.idBook = gb.idBook JOIN gender g ON gb.idGen = g.idGen WHERE b.disableBook=1 GROUP BY b.idBook;");
            return books;
        } catch (error) {
            console.log('Modelo:', error);
            throw error; // Lanzar el error para manejarlo en el controlador
        }
    }


    static async postBook(body) {
        try {

            const { nameBook, amountBook, genBook, sumBook, yearbook, authbook, postbook, disableBook } = body
            const books = await connection.query("INSERT INTO book (nameBook, amountBook, sumBook, yearbook, authbook, postbook, disableBook)VALUES (?,?,?,?,?,?,?,?)", [nameBook, amountBook, genBook, sumBook, yearbook, authbook, postbook, disableBook])

            if (books) {
                return 1
            }
            return books
        } catch (error) {

        }
    }
    static async getBookById(idBook) {
        try {
            const [book] = await connection.query("SELECT BIN_TO_UUID(b.idBook) AS id, b.nameBook, b.amountBook, GROUP_CONCAT(g.nameGen SEPARATOR ', ') AS genBook, b.sumBook, b.yearbook, b.authbook, b.postbook, b.disableBook FROM book b JOIN genderBook gb ON b.idBook = gb.idBook JOIN gender g ON gb.idGen = g.idGen WHERE BIN_TO_UUID(b.idBook)= ? GROUP BY b.idBook;", [idBook]);
            return book;
        } catch (err) {
            console.log('Hubo un error en la búsqueda del libro');
            throw err;
        }
    }



    static async getBookByName(nameBook) {
        try {
            const [book] = await connection.query("SELECT BIN_TO_UUID(b.idBook) AS id, b.nameBook, b.amountBook, GROUP_CONCAT(g.nameGen SEPARATOR ', ') AS genBook, b.sumBook, b.yearbook, b.authbook, b.postbook, b.disableBook FROM book b JOIN genderBook gb ON b.idBook = gb.idBook JOIN gender g ON gb.idGen = g.idGen WHERE b.nameBook LIKE ?  GROUP BY b.idBook;", [`%${nameBook}%`]);
            return book;
        } catch (err) {
            console.log('Hubo un error en la búsqueda del libro');
            throw err;
        }
    }


    static async getBookByAuthor(criterio, clave) {
        try {
            console.log(criterio + 'model');
            const [book] = await connection.query('SELECT BIN_TO_UUID(b.idBook) AS id, b.nameBook, b.amountBook, GROUP_CONCAT(g.nameGen SEPARATOR \', \') AS genBook, b.sumBook, b.yearbook, b.authbook, b.postbook, b.disableBook FROM book b JOIN genderBook gb ON b.idBook = gb.idBook JOIN gender g ON gb.idGen = g.idGen WHERE ?? = ? GROUP BY b.idBook', [criterio, clave]);
            return book;
        } catch (err) {
            console.log('Hubo un error en la búsqueda del libro');
            throw err;
        }
    }
    

    static async getBookByGender(nameGen) {
        try {
            const [book] = await connection.query("SELECT  BIN_TO_UUID(b.idBook) AS id, b.nameBook, b.amountBook, GROUP_CONCAT(g.nameGen SEPARATOR ', ') AS genBook, b.sumBook, b.yearbook, b.authbook, b.postbook, b.disableBook FROM book b JOIN genderBook gb ON b.idBook = gb.idBook JOIN gender g ON gb.idGen = g.idGen WHERE g.nameGen = ? GROUP BY b.idBook", [nameGen]);
            return book;
        } catch (err) {
            console.log('Hubo un error en la búsqueda del libro');
            throw err;
        }
    }

    static async getGender() {
        try {
            const [book] = await connection.query('select DISTINCT nameGen from gender');
            return book;
        } catch (err) {
            console.log('Hubo un error en la búsqueda del libro');
            throw err;
        }
    }

    static async getAge() {
        try {
            const [book] = await connection.query('select DISTINCT yearbook from book');
            return book;
        } catch (err) {
            console.log('Hubo un error en la búsqueda del libro');
            throw err;
        }
    }

    
    static async getAuthor() {
        try {
            const [book] = await connection.query('select DISTINCT authbook from book');
            return book;
        } catch (err) {
            console.log('Hubo un error en la búsqueda del libro');
            throw err;
        }
    }

}
