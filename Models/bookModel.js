import {createConnection} from '../Database/ConfigDatabase.js';
const connection =  createConnection();

console.log(connection);

export class bookModel{
    static async getBooks(){
        const book = await connection.query('Select * from book');
        return book;
    }
}