import { Socket } from "socket.io";
import { UsuarioLista } from '../classes/usuarios-lista';
import { Usuario } from '../classes/usuario';


export const UsuariosConectados = new UsuarioLista();

export const conectarCliente = (cliente: Socket) =>{
    const usuario = new Usuario( cliente.id);
    UsuariosConectados.agregar( usuario );

}

export const desconectar = (cliente: Socket) =>{
  cliente.on('disconnect', () => {
    console.log('Cliente desconectado');

    UsuariosConectados.borrarUsuario(cliente.id);
  });
}

//Escuchar mensajes
export const mensaje = (cliente: Socket, io: SocketIO.Server) =>{
    cliente.on('mensaje', ( payload: {de:string, cuerpo:string})=>{
        console.log('Mensaje recibido', payload);

        io.emit('mensaje-nuevo', payload );
    });
}

//Configurar usuario
export const configurarUsuario = (cliente: Socket, io: SocketIO.Server) =>{
    cliente.on('configurar-usuario', ( payload: {nombre:string}, callback: Function)=>{
       
        UsuariosConectados.actualizarNombre( cliente.id, payload.nombre);

        callback({
            ok:true,
            mensaje: `Usuario ${ payload.nombre }, configurando`
        });
    });
}