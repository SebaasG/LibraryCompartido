export class adminCtrl {
    constructor ({adminMdl}){
        this.adminMdl = adminMdl;
    }
    // Obtener todos los libros
    getBooks = async (req,res)=>{
    try{
        const result = await this.adminMdl.getBooks();
        
        console.log('Si se esta trayendo algo');
        res.status(200).json(result);

        }catch(err){
        console.log('Error en el Controlador', err);
        res.status(404).json(err)
    }
    }
    // Obtener un libro por el id
    getBookById = async (req,res)=>{
        try{
            const {idBook} = req.params;
            console.log(idBook);
            const result =  await this.adminMdl.getBookById(idBook);
            res.status(200).json(result);
        }catch(err){  
        console.log('Error en el Controlador', err);
        res.status(404).json(err)

        }
    }
    
}