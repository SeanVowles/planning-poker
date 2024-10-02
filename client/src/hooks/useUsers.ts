import { useEffect, useReducer, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { userReducer } from '../store/userReducer';
import { UserActionTypes } from '../types/actionTypes';
import { User, UsersState } from '../types/userState';
import config from '../utils/config';

const initialState: UsersState = {
    users: [],
    socketId: null,
};

const socket: Socket = io(config.SERVER_URL);

export const useUsers = () => {
    const [state, dispatch] = useReducer(userReducer, initialState);

    useEffect(() => {

        socket.on('users', (updatedUsers: User[]) => {
            dispatch({ type: UserActionTypes.SET_USERS, payload: updatedUsers })
        });

        return () => {
            socket.off('room_users'); // Cleanup the listener and unmount.
        };
    }, []);

    const joinRoom = (roomName: string, nickname: string) => {
        socket.emit('join_room', roomName, nickname); // Emit event to join a room.
        const socketId = socket.id!
        dispatch({ type: UserActionTypes.JOIN_ROOM, payload: { socketId: socketId, nickname: nickname } });
    };

    const leaveRoom = (roomName: string) => {
        socket.emit('leave_room', roomName); // Emit event to leave room.
        const socketId = socket.id!
        dispatch({ type: UserActionTypes.LEAVE_ROOM, payload: { socketId: socketId } });
    };

    const removeUser = (userId: string) => {
        socket.emit('remove_user', userId);
    }

    return { users: state.users, joinRoom, leaveRoom, removeUser };
};
