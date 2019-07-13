import { Socket } from "socket.io";
import { UsuarioLista } from '../classes/usuarios-lista';
import { Usuario } from '../classes/usuario';
import socketIO from 'socket.io';


export const UsuariosConectados = new UsuarioLista();

export const conectarCliente = (cliente: Socket, io: SocketIO.Server) =>{
    const usuario = new Usuario( cliente.id);
    UsuariosConectados.agregar( usuario );
 
}

export const desconectar = (cliente: Socket, io: socketIO.Server) =>{
  cliente.on('disconnect', () => {
    console.log('Cliente desconectado');

    UsuariosConectados.borrarUsuario(cliente.id);
    io.emit('usuarios-activos', UsuariosConectados.getLista());

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

        io.emit('usuarios-activos', UsuariosConectados.getLista());

        callback({
            ok:true,
            mensaje: `Usuario ${ payload.nombre }, configurando`
        });
    });
} 
//OBTENER USUARIOS
export const obtenerUsuarios = (cliente: Socket, io: SocketIO.Server) =>{
    cliente.on('obtener-usuario', ()=>{

        io.to( cliente.id).emit('usuarios-activos', UsuariosConectados.getLista());
    });
 }

