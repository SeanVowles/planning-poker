import React, { useState } from 'react';
import { useUsers } from '../hooks/useUsers';
import UserList from './UserList';

const RoomManager: React.FC = () => {
    const [roomName, setRoomName] = useState('');
    const [userId, setUserId] = useState('');
    const { users, joinRoom, leaveRoom } = useUsers();

    const handleJoinRoom = () => {
        if (roomName && userId) {
            joinRoom(roomName, userId);
        }
    };

    const handleLeaveRoom = () => {
        if (roomName && userId) {
            leaveRoom(roomName, userId);
        }
    };

    return (
        <div>
            <h2>Room Manager</h2>
            <input
                type="text"
                placeholder="Enter room name"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Enter your user ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
            />
            <button onClick={handleJoinRoom}>Join Room</button>
            <button onClick={handleLeaveRoom}>Leave Room</button>

            <UserList users={users} />
        </div>
    );
};

export default RoomManager;
