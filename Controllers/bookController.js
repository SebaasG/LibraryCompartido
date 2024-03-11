export class bookController {
    constructor({ bookModel }) {
        this.bookModel = bookModel;
    }

    getBooks = async (req, res) => {
        try {
            const books = await this.bookModel.getBooks(); 
            res.status(200).json(books);
        } catch (error) {
            console.log('Error en el controlador:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }


    postBooks = async (req,res) =>{
        try {
            console.log('entra quis')
            const {body} = req
            console.log(body);
            const books = await this.bookModel.postBook(body);
            console.log(books)
            if(books === 1){
                res.status(201).json('creado con éxito:'+ body)
            }else{
                console.log('te falta mente chacho')
            }
        } catch (error) {
            
        }
    }
}
