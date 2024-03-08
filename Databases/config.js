
import mysql from 'mysql2/promise';

export const dbConfig = {
    host: 'localhost',
    user: 'root',
    port: '3306',
    password: '1234',
    database: 'library'
};

export const createConnection = async () => {
    const connection = await mysql.createConnection(dbConfig);
    return connection;
};
