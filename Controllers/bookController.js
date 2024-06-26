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
            if (book) {
                res.status(200).json(book);
            } else {
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
            if (book) {
                res.status(200).json(book);
            } else {
                res.status(404).json("no se encontro el libro loco ");
            }
        } catch (error) {
        }
    }

    getBookByAuthor = async (req, res) => {
        try {
            const clave = 'authbook'
            const name = req.params.authbook;
            const book = await this.bookModel.getBookByAuthor(clave, name)
            if (book) {
                res.status(200).json(book);
            } else {
                res.status(404).json("no se encontro el libro loco ");
            }
        } catch (error) {
            console.log(error)
        }
    }

    getBookByAge = async (req, res) => {
        try {
            const clave = 'yearBook'
            const name = req.params.yearBook;
            const book = await this.bookModel.getBookByAuthor(clave, name)
            if (book) {
                res.status(200).json(book);
            } else {
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
            if (book) {
                res.status(200).json(book);
            } else {
                res.status(404).json("no se encontro el libro loco ");
            }
        } catch (error) {
            console.log(error)
        }
    }

    getGender = async (req, res) => {
        try {
            const gender = await this.bookModel.getGender()
            if (gender) {
                res.status(200).json(gender);
            } else {
                res.status(404).json("no se encontro el libro loco ");
            }
        } catch (error) {
            console.log(error)
        }
    }

    getAge = async (req, res) => {
        try {
            const Age = await this.bookModel.getAge()
            if (Age) {
                res.status(200).json(Age);
            } else {
                res.status(404).json("no se encontro el libro loco ");
            }
        } catch (error) {
            console.log(error)
        }
    }

    getAuthor = async (req, res) => {
        try {
            const author = await this.bookModel.getAuthor()
            if (author) {
                res.status(200).json(author);
            } else {
                res.status(404).json("no se encontro el libro loco ");
            }
        } catch (error) {
            console.log(error)
        }
    }

    getNameUser = async (req, res) => {
        try {
            const name = req.params.nameUser;
            const user = await this.bookModel.getNameUser(name);
            if (name) {
                res.status(200).json(user)
            }
            res.status(404).json('no se encontró hubo un error ')
        } catch (error) {
            console.log(error)
        }
    }

    getTransc = async (req,res) =>{
        const docUser = req.params.docUser;

        const [result] = await this.bookModel.getTransacUser(docUser)
        if(result){
            res.status(200).json(result)
        }else{
            res.status(404).json('Error al cargar las transacciones del usuario')
        }
    }

    getTranscLoan = async (req,res) =>{
        const docUser = req.params.docUser;

        const [result] = await this.bookModel.getTransacUserLoan(docUser)
        if(result){
            res.status(200).json(result)
        }else{
            res.status(404).json('Error al cargar las transacciones del usuario')
        }
    }
}

