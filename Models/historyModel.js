import {createConnection} from '../Databases/config.js';

const connection = await createConnection();

export class historyMDL{
    
    static async getDataTransac(page){
        try{    
            page = (page - 1) *10
            const [[sql]] = await connection.execute('CALL getTransac(?)', [page]);
            const [countRegisters] = await connection.query('SELECT COUNT(*) AS registers FROM transac;');
            const count = Math.ceil(countRegisters[0].registers /10);
            return {data: sql ,  tabs: count};

        }catch(e){
            console.log(e);
            throw new Error;
        }
    }
}