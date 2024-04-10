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

    static async getTransacUser (docUser){
    try {
        let offset = 0;
        const Trasc = await connection.query(" Select TypeTrans option1, b.nameBook option2, DATE_FORMAT(dateTrans,'%d %M %Y %hh')as option3 from transac t join book b on t.idBook = b.idBook where docUser = ? limit 10 offset ?", [docUser, offset]);

        return Trasc;
    } catch (error) {
        console.log('Error al cargar las transacciones del usuario' +error);
    }
    }

    
    static async getTransacUserLoan (docUser){
        try {   
            let offset = 0;
            const Trasc = await connection.query("Select b.nameBook option1, DATE_FORMAT(l.dateOut, '%d %M %Y %hh')as option2, DATE_FORMAT(timelimit, '%d %M %Y %hh') option3 from loan l join book b on l.idBook = b.idBook where stateLoan = 1 and docUser = ? limit 10 offset ?;", [docUser, offset]);
    
            return Trasc;
        } catch (error) {
            console.log('Error al cargar las transacciones del usuario' +error);
        }
        }


    static async getBookByAuthor(criterio, clave) {
        try {
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
            const [book] = await connection.query('select DISTINCT nameGen from gender order by nameGen ASC ');
            return book;
        } catch (err) {
            console.log('Hubo un error en la búsqueda del libro');
            throw err;
        }
    }

    static async getAge() {
        try {
            const [book] = await connection.query('select DISTINCT yearbook from book order by yearbook DESC');
            return book;
        } catch (err) {
            console.log('Hubo un error en la búsqueda del libro');
            throw err;
        }
    }


    static async getAuthor() {
        try {
            const [book] = await connection.query('select DISTINCT authbook from book order by authbook ASC ');
            return book;
        } catch (err) {
            console.log('Hubo un error en la búsqueda del libro');
            throw err;
        }
    }

    static async getNameUser(name) {
        try {
            const [nameUser] = await connection.query('select nameUser,docUser from user where emailUser = ?', [name])
            return nameUser;
        } catch (error) {
            console.log(error)
        }
    }

}
