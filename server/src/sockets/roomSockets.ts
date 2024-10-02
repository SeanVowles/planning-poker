import { Server, Socket } from 'socket.io';

/** Structure to hold users in rooms */
const rooms: Record<string, Set<string>> = {};

/** Emit updated user list for a specific room to all clients in that room */
const emitUpdatedRoomUsers = (io: Server, room: string) => {
    if (rooms[room]) {
        io.to(room).emit('room_users', Array.from(rooms[room]));
    }
};

export const roomSocketHandler = (io: Server) => {
    io.on('connection', (socket: Socket) => {

        // Handle joining a room
        socket.on('join_room', (room: string) => {
            // Create the room if it doesn't exist
            if (!rooms[room]) {
                rooms[room] = new Set<string>();
            }

            if (!rooms[room].has(socket.id)) {
                rooms[room].add(socket.id);
                socket.join(room); // Join the socket to the room
                emitUpdatedRoomUsers(io, room);
            } else {
                console.info(`User ${socket.id} already in room: ${room}`);
            }
        });

        // Handle leaving a room
        socket.on('leave_room', (room: string) => {
            if (rooms[room]) {
                rooms[room].delete(socket.id); // Remove the user from the room

                // If the room is empty, delete it
                if (rooms[room].size === 0) {
                    delete rooms[room];
                } else {
                    // Emit updated users in the room
                    emitUpdatedRoomUsers(io, room);
                }
                socket.leave(room); // Leave the socket from the room
            }
        });

        // Handle disconnection
        socket.on('disconnect', () => {
            // Remove the user from all rooms
            for (const room in rooms) {
                if (rooms[room].has(socket.id)) {
                    rooms[room].delete(socket.id);
                    // If the room is empty, delete it
                    if (rooms[room].size === 0) {
                        delete rooms[room];
                    } else {
                        // Emit updated users in the room
                        emitUpdatedRoomUsers(io, room);
                    }
                }
            }
        });
    });
};
