import { createConnection } from "../Databases/config.js";
const connection = await createConnection();
export class adminMdl {
  // Modelo para obtener todos los libros de la bd.
  static async getBooks(page) {
    try {
       // Query para contar el numero de registros de la tabla.
       const [sqlCount] = await connection.query('SELECT COUNT(*) AS recordCounter FROM book;');
       const recordCounter =  sqlCount[0].recordCounter // Cantidad de registros en total de la tabal.
       const tabsNumber = recordCounter / 10; // Cantidad de pestañas para la paginacion.
       const offSetValue = ( page - 1) * 10; // Mostrasra desde que registro tiene que empezar a traerse dependiendo de la pagina. 
      // Query donde se van a traer los registros
       const [sql] = await connection.query(
        `SELECT BIN_TO_UUID(b.idBook) AS idBook, b.nameBook,b.amountBook,GROUP_CONCAT(g.nameGen SEPARATOR ', ') AS genBook,b.sumBook,b.yearbook,b.authbook,
        b.postbook,b.disableBook FROM book b JOIN genderBook gb ON b.idBook = gb.idBook JOIN gender g ON gb.idGen = g.idGen where b.disableBook=1 GROUP BY b.idBook LIMIT 10 OFFSET ? `,[offSetValue])
        const response = {tabs: tabsNumber, query: sql}  
        return  response;
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

      const sql = await connection.query(
        "UPDATE book SET nameBook = ?, yearbook = ?,amountBook = ?,postbook=?, sumBook = ?, authbook = ?, genBook = ?, disableBook = ?   WHERE BIN_TO_UUID(idBook) = ?",
        [
          nameBook,
          yearbook,
          amountBook,
          postbook,
          sumBook,
          authbook,
          genBook,
          disableBook,
          idBook,
        ]
      );
      return sql;
    } catch (err) {
      console.log("Hubo un error al actualizar los libros.");
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
    const sql = await connection.query(
      "INSERT INTO book (nameBook, amountBook, genBook, sumBook, yearbook, authbook, postbook, disableBook) VALUES (?,?,?,?,?,?,?,1)",
      [nameBook, amountBook, genBook, sumBook, yearbook, authbook, postbook]
    );
    return sql;
  }
  //Buscar Libros
  static async shearchBooks(filter, data) {
    try {
      console.log("Si se esta mandando algo al modelo", filter, data);
      const [sql] = await connection.query(
        "SELECT BIN_TO_UUID(idBook) as idBook,nameBook, amountBook, genBook,  yearbook, authbook, disableBook, postbook, disableBook sumBook FROM book WHERE " + filter + " LIKE ?", [`%${data}%`]
      );
      return sql;
    } catch (err) {
      console.log("Hubo un error en el buscador de libros.");
      throw err;
    }
  }

  // PAGINACION GET  
  static async getPagination(page) {
    try{
        // const [sql]= await connection.query ();
        // return sql
    }catch{
     console.log('Hubo un error en el modal, en la paginacion');
     throw err;
    }
  }

}
