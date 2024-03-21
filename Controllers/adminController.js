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

    // Actualizar
    updateBooks = async(req,res)=>{
        try{

            const {body} = req;
            const result = await this.adminMdl.updateBooks({body});
            console.log(result)
            res.status(200).json({message:'Todo bien'})
        }catch(err){
            console.log('Error en el controlador', err);
            res.status(404).json({message:'Hubo un error en el controlador actualizar'});
        }
    }
    // Create
    createBooks = async(req,res)=>{
        try{
            const {body} = req;
            const result = await this.adminMdl.createBooks({body});
            console.log(result);
            res.status(200).json({message:'Todo bien'});
        }catch(err){
            console.log('Error en el controlador, crear', err);
            res.status(404).json({message:'Hubo un error en el controlador crear'});
        }
    }
    //Shearch
    shearchBooks = async (req,res)=>{
            try{
                const {filter, data} = req.params;

                
                // console.log(`El filtro es: ${filter}, los datos son: ${data}`);
                const result = await this.adminMdl.shearchBooks(filter, data);
                console.log(result)
                res.status(200).json(result);
            }catch(err){
                console.log('Error en el controlador, Shearch Book', err);
                res.status(404).json({message:'Hubo un error en el controlador buscar.'})
            }
    }

    // PAGINACION GET
    getPagination = async (req, res)=>{
        try{
            const {page} = req.params;
            // const result = await this.adminMdl.getPagination(page);
            // console.log(result);
            console.log(`page: ${page}`);
            res.status(200).json('R en mi fai');
        }catch(err){
            res.status(404).json({message:'Hubo un error al traer los datos de la paginacion.'})
        }
    }
    
}