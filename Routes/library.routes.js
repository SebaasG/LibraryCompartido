
import router from 'express';
import { userCtrl } from '../Controllers/userController.js';
import { bookController } from '../Controllers/bookController.js';
import { userMdl } from '../Models/userModel.js';
import { adminCtrl } from '../Controllers/adminController.js';

export const routerLibrary = () => {
    const libraryRouter = router();
    const UserCtrl = new userCtrl({userMdl});
    libraryRouter.post('/register', UserCtrl.createUser);
    libraryRouter.post('/login', UserCtrl.verifyUser);
    return libraryRouter;
}

export const createBookRoutes = ({bookModel}) => {
    const bookRouter = router();
    const BookController = new bookController({bookModel});
    bookRouter.get('/index/:id', BookController.getBooksById);
    bookRouter.get('/index/author/:authbook', BookController.getBookByAuthor);
    bookRouter.get('/index/year/:yearBook', BookController.getBookByAge);
    bookRouter.get('/index', BookController.getGender);
    bookRouter.get('/age', BookController.getAge);
    bookRouter.get('/author', BookController.getAuthor);
    bookRouter.get('/index/gen/:genName', BookController.getBookByGender);
    bookRouter.get('/name/:nameBook', BookController.getBookByName);
    bookRouter.get('/all', BookController.getBooks);
    bookRouter.put('/save', BookController.postBooks);
    return bookRouter;
}

export const adminBookRoute = ({adminMdl})=>{
    const adminRouter = router();
    const adminController = new adminCtrl({adminMdl});
    adminRouter.get('/books/:page', adminController.getBooks);
    adminRouter.get('/books/getById/:idBook', adminController.getBookById);
    adminRouter.put('/books/update', adminController.updateBooks);
    adminRouter.post('/books/create', adminController.createBooks);
    adminRouter.get('/books/shearchBook/:filter/:data', adminController.shearchBooks);
    adminRouter.get('/books/pagination/:page', adminController.getPagination);
    return adminRouter;
}
