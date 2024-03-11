import { createConnection } from '../Databases/config.js';

const connection = await createConnection();

export class bookModel {
    static async getBooks() {
        try {
            console.log('Entra al modelo');
            const [books] = await connection.query('SELECT * FROM book');
            return books;
        } catch (error) {
            console.log('Modelo:', error);
            throw error; // Lanzar el error para manejarlo en el controlador
        }
    }
}
