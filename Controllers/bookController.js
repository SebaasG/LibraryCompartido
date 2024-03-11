export class bookController {
    constructor({ bookModel }) {
        this.bookModel = bookModel
    }

    getBooks = async (req, res) => {
        try {
            const book = await this.bookModel.getBooks();
            res.status(200).json('todo ok')
        } catch (error) {
            console.log(error)
        }
    }



}