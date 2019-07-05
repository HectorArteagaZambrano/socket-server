import Server from './classes/server';
import { SERVER_PORT } from './global/environments';
import  router from './routes/router';
import bodyParser from 'body-parser';
import cors from 'cors';
/*const nombre = 'Alberto';
console.log(`Mi nombre es ${ nombre }`);*/

const server = new Server();

//BodyParser
server.app.use( bodyParser.urlencoded({ extended: true}));
server.app.use( bodyParser.json());


server.app.use( cors({ origin: true, credentials: true}))

// Rutas de servicios
server.app.use('/', router);

server.start(()=>{
    console.log(`Servidor corriendo en el puerto ${ SERVER_PORT}`);
});