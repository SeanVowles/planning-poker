import { useEffect, useReducer } from 'react'
import { io, Socket } from 'socket.io-client';
import config from '../utils/config';
import { Actions } from '../types/actions';
import { initialState, userReducer } from '../store/userReducer';

export const useUsers = () => {
    const [state, dispatch] = useReducer(userReducer, initialState);

    useEffect(() => {
        const socket: Socket = io(config.SERVER_URL);

        socket.on('users', (userList: string[]) => {
            dispatch({ type: Actions.SetUsers, payload: userList })
        });

        return () => {
            socket.disconnect();
        };
    }, [dispatch]);

    return { users: state.users };
};
