
import router from 'express';
import { userCtrl } from '../Controllers/userController.js';
import { bookController } from '../Controllers/bookController.js';
import { userMdl } from '../Models/userModel.js';

export const routerLibrary = () => {
    const libraryRouter = router();
    const UserCtrl = new userCtrl({userMdl});
    libraryRouter.post('/register', UserCtrl.createUser);
    libraryRouter.post('/login', UserCtrl.verifyUser);
    return libraryRouter;
}

export const createBookRoutes = ({bookModel}) => {
    const bookRouter = router();
    const BookController = new bookController({bookModel})
    bookRouter.get('/all', BookController.getBooks);
    bookRouter.post('/save', BookController.postBooks);
    return bookRouter;
}
