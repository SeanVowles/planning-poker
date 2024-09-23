import { Server, Socket } from 'socket.io';

/** Master list of all connected users */
const connectedUsers = new Set<string>();

// Emit updated user list to all clients
const emitUpdatedUsers = (io: Server, connectedUsers: Set<string>) => {
    io.emit('users', Array.from(connectedUsers));
}

export const userSocketHandler = (io: Server) => {
    io.on('connection', (socket: Socket) => {
        console.info('User connected: ', socket.id);
        connectedUsers.add(socket.id);

        emitUpdatedUsers(io, connectedUsers);

        // Handle disconnection
        socket.on('disconnect', () => {
            console.info('User disconnected: ', socket.id);
            connectedUsers.delete(socket.id);

            emitUpdatedUsers(io, connectedUsers);
        });
    });
};
