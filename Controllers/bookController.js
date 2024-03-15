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


    postBooks = async (req, res) => {
        try {
            console.log('entra quis')
            const { body } = req
            console.log(body);
            const books = await this.bookModel.postBook(body);
            console.log(books)
            if (books === 1) {
                res.status(201).json('creado con éxito:' + body)
            } else {
                console.log('te falta mente chacho')
            }
        } catch (error) {

        }
    }


    getBooksById = async (req, res) => {
        try {
            console.log('Entra aqui controller')
            const id = req.params.id
            console.log(id)
            const book = await this.bookModel.getBookById(id);
            if(book){
                res.status(200).json(book);
            }else{
                res.status(404).json('hola')
            }

        } catch (error) {
            console.log(error)
        }
    }


    getBookByName = async (req, res) => {
        try {
            const name = req.params.nameBook
            console.log(name+'controller')
            const book = await this.bookModel.getBookByName(name)
            if(book){
                res.status(200).json(book);
            }
            res.status(404).json("no se encontro el libro loco ");
        } catch (error) {

        }
    }
}

