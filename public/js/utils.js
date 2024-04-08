export async function filterTransac(type, filter, input, connection) {
  if(type === 'ALL'){
    const query = connection.query(`SELECT t.TypeTrans, tt.nameType,u.docUser, u.nameUser, b.nameBook, t.dateTrans FROM transac t 
  JOIN typetransaction tt ON t.TypeTrans = tt.idType 
  JOIN book b ON b.idBook = t.idBook 
  JOIN user u ON u.docUser = t.docUser 
  WHERE ?? LIKE ? LIMIT 10 OFFSET 0;`, [filter,`%${input}%`] )  
  return query;
  }else {

    const query = connection.query(`SELECT t.TypeTrans, tt.nameType,u.docUser, u.nameUser, b.nameBook, t.dateTrans FROM transac t 
    JOIN typetransaction tt ON t.TypeTrans = tt.idType 
    JOIN book b ON b.idBook = t.idBook 
    JOIN user u ON u.docUser = t.docUser 
    WHERE tt.nameType= ? AND ?? LIKE ? LIMIT 10 OFFSET 0;`, [type,filter,`%${input}%`] )  
    return query;
  }
  
}
