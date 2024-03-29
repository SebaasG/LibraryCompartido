export class adminCtrl {
    constructor({ adminMdl }) {
        this.adminMdl = adminMdl;
    }
    // Obtener todos los libros
    getBooks = async (req, res) => {
        try {
            const { page } = req.params
            const result = await this.adminMdl.getBooks(parseInt(page));
            res.status(200).json(result);

        } catch (err) {
            console.log('Error en el Controlador', err);
            res.status(404).json(err)
        }
    }
    // Obtener un libro por el id
    getBookById = async (req, res) => {
        try {
            const { idBook } = req.params;
            const result = await this.adminMdl.getBookById(idBook);
            res.status(200).json(result);
        } catch (err) {
            console.log('Error en el Controlador', err);
            res.status(404).json(err)

        }
    }

    // Actualizar
    updateBooks = async (req, res) => {
        try {

            const { body } = req;
            const result = await this.adminMdl.updateBooks({ body });
            res.status(200).json({ message: 'Todo bien' })
        } catch (err) {
            console.log('Error en el controlador', err);
            res.status(404).json({ message: 'Hubo un error en el controlador actualizar' });
        }
    }
    // Disable Book
    disableBook = async (req, res) => {
        try {
            const { body } = req;
            const result = await this.adminMdl.disableBooks({ body });
            res.status(200).json({ message: 'Todo bien' });
        } catch (err) {
            console.log('Error en el controlador', err);
            res.status(404).json({ message: 'Hubo un error en el controlador disableBook' });
        }
    }
    // Create
    createBooks = async (req, res) => {
        try {
            const { body } = req;
            const result = await this.adminMdl.createBooks({ body });
            res.status(200).json({ message: 'Todo bien' });
        } catch (err) {
            console.log('Error en el controlador, crear', err);
            res.status(404).json({ message: 'Hubo un error en el controlador crear' });
        }
    }
    //Shearch
    shearchBooks = async (req,res)=>{
            try{
                const {filter, data, state} = req.params;
                console.log(req.params);
                // console.log(`El filtro es: ${filter}, los datos son: ${data}`);
                const result = await this.adminMdl.searchBooks(filter, data,state);
                console.log(result)
                res.status(200).json(result);
            }catch(err){
                console.log('Error en el controlador, Shearch Book', err);
                res.status(404).json({message:'Hubo un error en el controlador buscar.'})
            }
    }



}