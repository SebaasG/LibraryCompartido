import { createConnection } from "../Databases/config.js";
const connection = await createConnection();
export class adminMdl {
  // Modelo para obtener todos los libros de la bd.
  static async getBooks(page) {
    try {

      // Query para contar el numero de registros de la tabla.
      const [sqlCountActive] = await connection.query('SELECT COUNT(*) AS recordCounter FROM book WHERE disableBook = 1;');
      const [sqlCountDisable] = await connection.query('SELECT COUNT(*) AS recordCounter FROM book WHERE disableBook = 2;');

      // Calcular la cantidad de pestañas activas
      const tabsNumberActive = sqlCountActive[0].recordCounter / 10;
      const tabsNumberDisable = sqlCountDisable[0].recordCounter / 10;

      const offSetValue = (page - 1) * 10;  // Mostrasra desde que registro tiene que empezar a traerse dependiendo de la pagina. 

      // Query donde se van a traer los registros
      const [sqlActive] = await connection.query(
        `SELECT BIN_TO_UUID(b.idBook) AS idBook, b.nameBook,b.amountBook,GROUP_CONCAT(g.nameGen SEPARATOR ', ') AS genBook,b.sumBook,b.yearbook,b.authbook,
        b.postbook,b.disableBook FROM book b JOIN genderBook gb ON b.idBook = gb.idBook JOIN gender g ON gb.idGen = g.idGen where b.disableBook=1 GROUP BY b.idBook LIMIT 10 OFFSET ? `,[offSetValue])
        
        const [sqlDisable] = await connection.query(
          `SELECT BIN_TO_UUID(b.idBook) AS idBook, b.nameBook,b.amountBook,GROUP_CONCAT(g.nameGen SEPARATOR ', ') AS genBook,b.sumBook,b.yearbook,b.authbook,
          b.postbook,b.disableBook FROM book b JOIN genderBook gb ON b.idBook = gb.idBook JOIN gender g ON gb.idGen = g.idGen where b.disableBook=2 GROUP BY b.idBook LIMIT 10 OFFSET ? `,[offSetValue])
          

      const response = { tabsActive: tabsNumberActive, tabsDisable: tabsNumberDisable, queryActive: sqlActive, queryDisable: sqlDisable }

      return response;

    } catch (err) {
      console.log("Hubo un error en el modelo.", err);
      throw err;
    }
  }
  // Modelo para obtener un libro por id.
  static async getBookById(idBook) {
    try {
      const [sql] = await connection.query(
        `SELECT BIN_TO_UUID(b.idBook) AS idBook, b.nameBook,b.amountBook,GROUP_CONCAT(g.nameGen SEPARATOR ', ') AS genBook,b.sumBook,b.yearbook,b.authbook,
        b.postbook,b.disableBook FROM book b JOIN genderBook gb ON b.idBook = gb.idBook JOIN gender g ON gb.idGen = g.idGen where BIN_TO_UUID(b.idBook) = ? GROUP BY b.idBook`,
        [idBook]
      );
      return sql;
    } catch (err) {
      console.log("Hubo un error en la busqueda del libro");
      throw err;
    }
  }
  // Actualizar libros
  static async updateBooks({ body }) {
    try {
      const { idBook, nameBook, yearbook, amountBook, postbook,
        sumBook, authbook, genBook, disableBook, } = body;

      const sql = await connection.execute(
        `CALL updateBook(UUID_TO_BIN(?),?,?,?,?,?,?,?,?)`,
        [
          idBook,
          nameBook,
          amountBook,
          sumBook,
          yearbook,
          authbook,
          postbook,
          disableBook,
          genBook
        ]
      );
      return sql;
    } catch (err) {
      console.log("Hubo un error al actualizar los libros:", err); // Imprime el error completo para identificar el problema
      throw err;
    }
  }
  // Desactivar libros

  static async disableBooks({ body }) {
    try {
      const { idBook, disableBook } = body;
      const sql = await connection.query('UPDATE book SET disableBook = ? WHERE BIN_TO_UUID(idBook) = ?', [disableBook, idBook])
      return sql;
    } catch (err) {
      console.log('Hubo un error al desactivar el libro.');
      throw err;
    }
  }

  // Crear Libros
  static async createBooks({ body }) {
    const {
      nameBook,
      yearbook,
      amountBook,
      postbook,
      sumBook,
      authbook,
      genBook,
    } = body;
    const sql = await connection.execute(
      "CALL createBook(?,?,?,?,?,?,?,?)",
      [nameBook, amountBook, sumBook, yearbook, authbook, postbook, 1, genBook]
    );
    return sql;
  }
  //Buscar Libros
  static async searchBooks(filter, data, state) {
    try {
      const [sql] = await connection.query(
        "SELECT BIN_TO_UUID(idBook) as idBook,nameBook, amountBook,  yearbook, authbook, disableBook, postbook, sumBook FROM book WHERE " + filter + " LIKE ? AND disableBook = ? LIMIT 10 OFFSET 0", [`%${data}%`,state]
      );
      return sql;
    } catch (err) {
      console.log("Hubo un error en el buscador de libros.");
      throw err;
    }
  }


}


function ada (n, callback){
  n
}


const select= ada(1,(err,info)=>{

  console.log(info)
})