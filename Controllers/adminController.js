export class adminCtrl {
    constructor ({adminMdl}){
        this.adminMdl = adminMdl;
    }
    // Obtener todos los libros
    getBooks = async (req,res)=>{
    try{
        const result = await this.adminMdl.getBooks();
        
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

    updateBooks = async(req,res)=>{
        try{
            console.log(`epa: ${req.body}`)
            const {body}= req
            if(body){
                console.log('Si mi fai si va algo')
            };
            // const result = await this.adminMdl.updateBooks({body});
            res.status(200).json({message:'Todo bien'})
        }catch(err){
            console.log('Error en el controlador', err);
            res.status(404).json(err);
        }
    }
    
}