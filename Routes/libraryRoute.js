
import router from 'express';
import { userCtrl } from '../Controllers/userController.js';
import { bookController } from '../Controllers/bookController.js'


export const routerLibrary = () => {
    const librartyRouter = router();
    const UserCtrl = new userCtrl({ userMdl });
    librartyRouter.post('/', UserCtrl.createUser)
    return librartyRouter;
}

export const createBookRoutes = ({bookmodel})
