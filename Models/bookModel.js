import {createConnection} from '../Databases/config.js';
const connection =  createConnection();

console.log(createConnection);

export class bookModel{
    static async getBooks(){
        const book = await connection.query('Select * from book');
        return book;
    }
}