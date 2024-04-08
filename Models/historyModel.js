import {createConnection} from '../Databases/config.js';
import { filterTransac } from '../public/js/utils.js';

const connection = await createConnection();

export class historyMDL{
    
    static async getDataTransac(page){
        try{    
            page = (page - 1) * 10
            const [[sql]] = await connection.execute('CALL getTransac(?)', [page]);
            const [countRegisters] = await connection.query('SELECT COUNT(*) AS registers FROM transac;');
            const count = Math.ceil(countRegisters[0].registers /10);
            return {data: sql ,  tabs: count};

        }catch(e){
            console.log$(`Error en el modelo getTransac ${e}`);
            throw new Error;
        }
    }
    static async searchTransac(type, filter, input){
        try{
            const [sql] = await filterTransac(type, filter, input, connection)
            return sql;
        }catch(e){
            console.log(`Error en el modelo search ${e}`);
        }
    }
}