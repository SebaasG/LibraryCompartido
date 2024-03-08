import express from 'express';
import {routerLibrary} from './Routes/libraryRoute.js'
const app = express();

//Middlewares

//ROUTES
app.use('/library', routerLibrary);

//PORT
app.set('port', process.env.PORT || 3000);


// Iniciar el servidor
app.listen(app.get('port'), () => {
    console.log(`Servidor Express escuchando en el puerto ${app.get('port')}`);
});

