import { useEffect, useReducer } from 'react';
import { io, Socket } from 'socket.io-client';
import { userReducer } from '../store/userReducer';
import { UserActionTypes } from '../types/actionTypes';
import { User, UsersState } from '../types/userState';
import config from '../utils/config';

const socket: Socket = io(config.SERVER_URL);

const initialState: UsersState = {
    users: [],
};

export const useUsers = () => {
    const [state, dispatch] = useReducer(userReducer, initialState);
    const { users } = state; // Extract users directly from state.

    useEffect(() => {
        socket.on('users', (updatedUsers: User[]) => {
            dispatch({ type: UserActionTypes.SET_USERS, payload: updatedUsers })
        });

        return () => {
            socket.off('room_users'); // Cleanup the listener and unmount.
        };
    }, []);

    const joinRoom = (roomName: string, userId: string) => {
        socket.emit('join_room', roomName); // Emit event to join a room.
        dispatch({ type: UserActionTypes.JOIN_ROOM, payload: { userId } });
    };

    const leaveRoom = (roomName: string, userId: string) => {
        socket.emit('leave_room', roomName); // Emit event to leave room.
        dispatch({ type: UserActionTypes.LEAVE_ROOM, payload: { userId } });
    };

    return { users, joinRoom, leaveRoom };
};
