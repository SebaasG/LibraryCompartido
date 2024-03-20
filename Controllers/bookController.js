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
            const { body } = req
            const books = await this.bookModel.postBook(body);
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
            const id = req.params.id
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
    
            const book = await this.bookModel.getBookByName(name)
            if(book){
                res.status(200).json(book);
            }else{
                res.status(404).json("no se encontro el libro loco ");
            }
        } catch (error) {
        }
    }

    getBookByAuthor = async (req, res) => {
        try {
            const clave= 'authbook'
            const name = req.params.authbook;
            const book = await this.bookModel.getBookByAuthor(clave,name)
            if(book){
                res.status(200).json(book);
            }else{
                res.status(404).json("no se encontro el libro loco ");
            }
        } catch (error) {
            console.log(error)
        }
    }

    getBookByGender = async (req, res) => {
        try {
            const name = req.params.genName;
            const book = await this.bookModel.getBookByGender(name)
            if(book){
                res.status(200).json(book);
            }else{
                res.status(404).json("no se encontro el libro loco ");
            }
        } catch (error) {
            console.log(error)
        }
    }

    getGender = async (req, res) => {
        try {
            const gender = await this.bookModel.getGender()
            if(gender){
                res.status(200).json(gender);
            }
            res.status(404).json("no se encontro el libro loco ");
        } catch (error) {
            console.log(error)
        }
    }

}

