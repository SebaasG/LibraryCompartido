import express, {json} from 'express';
import { routLibrary } from './Routes/RoutLibrary.js';
import {MdwbodyParser} from './Middelwares/Middelwares.js'
import { corsMiddelware } from './Middelwares/cors.js';
const app = express();

//Middelwares
MdwbodyParser(app);
app.use(corsMiddelware);

//Rutas
app.use('/library', routLibrary);

//Port
app.set('port', process.env.PORT || 3000);
app.get('port')
app.listen(app.get('port'), ()=>{
    console.log(`Server on port http://localhost:${app.get('port')}`)
})
