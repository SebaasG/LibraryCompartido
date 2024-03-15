
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

export const createBookRoutes = ({bookModel, adminMdl}) => {
    const bookRouter = router();
    const BookController = new bookController({bookModel});
    bookRouter.get('/index/:id', BookController.getBooksById);
    bookRouter.get('/name/:nameBook', BookController.getBookByName);
    bookRouter.get('/all', BookController.getBooks);
    bookRouter.post('/save', BookController.postBooks);
    return bookRouter;
}

export const adminBookRoute = ({adminMdl})=>{
    const adminRouter = router();
    const adminController = new adminCtrl({adminMdl});
    adminRouter.get('/books', adminController.getBooks);
    adminRouter.get('/books/:idBook', adminController.getBookById);
    adminRouter.put('/books/update', adminController.updateBooks);
    return adminRouter;
}
