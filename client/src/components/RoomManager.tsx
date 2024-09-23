import React, { useReducer, useState } from 'react';
import { useRooms } from '../hooks/useRooms';
import { userReducer } from '../store/userReducer';
import { Actions } from '../types/actions';
import UserList from './UserList';

const RoomManager: React.FC = () => {
    const [roomInput, setRoomInput] = useState<string>('');
    const [isInRoom, setIsInRoom] = useState<boolean>(false);
    const [state, dispatch] = useReducer(userReducer, { users: [], room: null });

    const socket = useRooms(dispatch); // Pass dispatch to useSocket

    const joinRoom = () => {
        if (roomInput.trim() && !state.room) {
            socket.emit('join_room', roomInput);
            dispatch({ type: Actions.JoinRoom, payload: roomInput });
            setIsInRoom(true);
        }
    };

    const leaveRoom = () => {
        if (state.room) {
            socket.emit('leave_room', state.room);
            dispatch({ type: Actions.LeaveRoom, payload: null });
            setIsInRoom(false);
        }
    };

    return (
        <div>
            <h3>Room Manager</h3>
            <input
                type="text"
                value={roomInput}
                onChange={(e) => setRoomInput(e.target.value)}
                placeholder="Enter room name"
            />
            <button onClick={joinRoom} disabled={!!state.room}>Join Room</button>
            <button onClick={leaveRoom} disabled={!state.room}>Leave Room</button>
            {state.room && <p>Joined Room: {state.room}</p>}

            {/* Pass the users array from state to UserList */}
            <UserList users={state.users} isInRoom={isInRoom} />
        </div>
    );
};

export default RoomManager;
