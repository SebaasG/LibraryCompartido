import { createConnection } from "../Databases/config.js";
import {hashPass} from "../public/js/hashPass.js";

const connection = await createConnection();

export class userMdl{

    static async userCreate({body}){
        try{
            let newBody = {...body};
            const passHash = await hashPass(newBody.passUser);
            newBody.passUser = passHash;
            const {docUser, nameUser, emailUser, passUser, phoneUser, addressUser} = newBody;
            const sql = await connection.query('INSERT INTO user (docUser, nameUser, emailUser, passUser, phoneUser, addresUser, rolUser)'+
            'VALUES (?,?,?,?,?,?,2)', [docUser, nameUser, emailUser, passUser,phoneUser,addressUser]  );
            if(sql) return true;
            return false;
 
        }catch(err){
            console.log('Hubo un error')
            throw err;
        }
    }

    static async verifyUser({body}){
        try{
            let newBody = {...body};
            const passHash =await hashPass(newBody.passUser);
            newBody.passUser = passHash
            const {emailUser, passUser} = newBody;
            const [sql] = await connection.query('CALL verifySession(?,?)', [emailUser,passUser]); 
            console.log(sql[0][0].result)
            if(sql[0][0].result === 2) return false;

            return true
            
        }catch(err){
            console.log('Hubo un error');
            throw err;
        }
    }
}