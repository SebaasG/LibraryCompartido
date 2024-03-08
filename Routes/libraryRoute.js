import router from 'express';
import { userCtrl } from '../Controllers/userController.js';

export const routerLibrary = ()=>{
   const librartyRouter = router();
   const UserCtrl = new userCtrl({userMdl});
    librartyRouter.post('/',UserCtrl.createUser)
    return librartyRouter;
}