import express from 'express';
import {routerLibrary} from './Routes/library.routes.js'
import {createBookRoutes} from './Routes/library.routes.js'

import {bookModel} from './Models/bookModel.js'
const app = express();

//Middlewares

//ROUTES
app.use('/library', routerLibrary);
app.use('/book', createBookRoutes({ bookModel: bookModel }));
//PORT
app.set('port', process.env.PORT || 3000);


// Iniciar el servidor
app.listen(app.get('port'), () => {
    console.log(`Servidor Express escuchando en el puerto ${app.get('port')}`);
});

