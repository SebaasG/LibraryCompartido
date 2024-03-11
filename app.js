import express, { json } from 'express';
import express from 'express';
import {routerLibrary} from './Routes/library.routes.js'
import { routerLibrary } from './Routes/library.routes.js'
import { createBookRoutes } from './Routes/library.routes.js'
import { bookModel } from './Models/bookModel.js'



const app = express();
app.use(json());
//Middlewares


//ROUTES
app.use('/library', routerLibrary);
app.use('/book', createBookRoutes({ bookModel: bookModel })); // Pasa el controlador en lugar del modelo

//PORT
app.set('port', process.env.PORT || 3000);


//
app.disable('x-powered-by');

// Iniciar el servidor
app.listen(app.get('port'), () => {
    console.log(`Servidor Express escuchando en el puerto http://localHost:${app.get('port')}`);
});
