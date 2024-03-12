import express, { json } from 'express';
import {routerLibrary} from './Routes/library.routes.js';
import { createBookRoutes } from './Routes/library.routes.js'
import { bookModel } from './Models/bookModel.js'
import { userMdl } from './Models/userModel.js';
import bodyParser from 'body-parser';
import path,{dirname} from 'path';
import { fileURLToPath } from 'url';

//Creacion del __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express();
app.use(json());
app.use(bodyParser.urlencoded({ extended: true }));
//Middlewares


//ROUTES
app.use('/library', routerLibrary({userMdl: userMdl}));
app.use('/book', createBookRoutes({ bookModel: bookModel })); // Pasa el controlador en lugar del modelo
// Cargar la pagina en la ruta principal
app.use('/library', express.static(path.join(__dirname, 'public')));
app.get('/library',(req,res)=>{
    console.log(__dirname)
    const ruta = path.join(__dirname, 'public', 'index.html');
    console.log(ruta);
    res.status(200).sendFile(ruta);
})

//PORT
app.set('port', process.env.PORT || 3000);


//
app.disable('x-powered-by');

// Iniciar el servidor
app.listen(app.get('port'), () => {
    console.log(`Servidor Express escuchando en el puerto http://localHost:${app.get('port')}`);
});
