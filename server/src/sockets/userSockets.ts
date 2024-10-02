import { Server, Socket } from 'socket.io';

/** Master list of all connected users */
const connectedUsers = new Map<string, { id: string , isInRoom: boolean}>();

// Emit updated user list to all clients
const emitUpdatedUsers = (io: Server) => {
    io.emit('users', Array.from(connectedUsers.values()));
}

export const userSocketHandler = (io: Server) => {
    io.on('connection', (socket: Socket) => {
        connectedUsers.set(socket.id, { id: socket.id, isInRoom: false });

        emitUpdatedUsers(io);

        // Handle joining a room
        socket.on('join_room', (roomName: string) => {
            connectedUsers.set(socket.id, { id: socket.id, isInRoom: true });
            socket.join(roomName);
            emitUpdatedUsers(io);
        });

        // Handle leaving a room
        socket.on('leave_room', (roomName: string) => {
            connectedUsers.set(socket.id, { id: socket.id, isInRoom: false });
            socket.leave(roomName);
            emitUpdatedUsers(io);
        });

        // Handle disconnection
        socket.on('disconnect', () => {
            connectedUsers.delete(socket.id);
            emitUpdatedUsers(io);
        });
    });
};
