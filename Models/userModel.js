import { createConnection } from "../Databases/config.js";
import { hashPass } from "../public/js/hashPass.js";

const connection = await createConnection();

//funcion para verificar la existencia del usuario en la base de datos
const verifyExistenceUser = async ({ body }) => {
  const { docUser, emailUser } = body;
  console.log(docUser, emailUser);
  const [sql] = await connection.query(
    "SELECT docUser, emailUser FROM user WHERE docUser = ? OR emailUser = ?",
    [docUser, emailUser]
  );
  console.log("HPATAAA:", sql[0]);
  return sql;
};
// Modelo
export class userMdl {
  //Crear un usuario
  static async userCreate({ body }) {
    try {
     
      //Verificar si el usuario ya existe, si no para registrarlo.
      const result = await verifyExistenceUser({ body });
      if (result[0])  return 2;
    

      // Hash para la contraseña
      let newBody = { ...body };
      const passHash = await hashPass(newBody.passUser); //Hash Password
      newBody.passUser = passHash;
      const { docUser, nameUser, emailUser, passUser, phoneUser, addressUser } =
        newBody;

      // Insertar datos a la db
      const sql = await connection.query(
        "INSERT INTO user (docUser, nameUser, emailUser, passUser, phoneUser, addresUser, rolUser)" +
          "VALUES (?,?,?,?,?,?,2)",
        [docUser, nameUser, emailUser, passUser, phoneUser, addressUser]
      );
      console.log(`Como se esta mandando el sql: ${sql}`);
      if (!sql) return 3;
      
      return 1;

    } catch (err) {
      console.log("Hubo un error");
      throw err;
    }
  }

  //Verificar Usuario
  static async verifyUser({ body }) {
    try {

      let newBody = { ...body };
      //Hash Password
      const passHash = await hashPass(newBody.passUser);
      newBody.passUser = passHash;
      const { emailUser, passUser } = newBody;
      //Llama el proceso almacenado para verificar si el usuario si existe
      const [sql] = await connection.query("CALL verifySession(?,?)", [
        emailUser,
        passUser,
      ]);
      console.log(sql[0][0].result);
      if (sql[0][0].result === 2) return 2;
      
      return 1;
    } catch (err) {
      console.log("Hubo un error");
      throw err;
    }
  }
}
