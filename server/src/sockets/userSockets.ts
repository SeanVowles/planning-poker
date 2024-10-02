import { Server, Socket } from 'socket.io';

/** Master list of all connected users */
const connectedUsers = new Map<string, { socketId: string, isInRoom: boolean, nickname?: string }>();

// Emit updated user list to all clients
const emitUpdatedUsers = (io: Server) => {
    io.emit('users', Array.from(connectedUsers.values()));
}

export const userSocketHandler = (io: Server) => {
    io.on('connection', (socket: Socket) => {
        console.log('User connected: ', socket.id);
        connectedUsers.set(
            socket.id,
            {
                socketId: socket.id,
                isInRoom: false,
                nickname: ''
            }
        );

        emitUpdatedUsers(io);

        // Handle joining a room
        socket.on('join_room', (roomName: string, nickname: string) => {
            console.log('User joined room: ', socket.id, roomName, nickname);
            connectedUsers.set(
                socket.id,
                {
                    socketId: socket.id,
                    isInRoom: true,
                    nickname: nickname,
                });
            socket.join(roomName);
            emitUpdatedUsers(io);
        });

        // Handle leaving a room
        socket.on('leave_room', (roomName: string) => {
            console.log('User left room: ', socket.id, roomName);
            connectedUsers.set(
                socket.id,
                {
                    socketId: socket.id,
                    isInRoom: false,
                });
            socket.leave(roomName);
            emitUpdatedUsers(io);
        });

        // Todo: Move this logic to the roomSockets (we want admins to kick users from the room, not entirely from the server).
        // Add some sort of elevated permission for the 'Scrum Master'.
        socket.on('remove_user', (userId: string) => {
            console.log(`User ${userId} has been kicked by: ${socket.id}`);
            connectedUsers.delete(userId);
            emitUpdatedUsers(io);
        })

        // Handle disconnection
        socket.on('disconnect', () => {
            console.log('User disconnected: ', socket.id);
            connectedUsers.delete(socket.id);
            emitUpdatedUsers(io);
        });
    });
};
