import { useEffect } from 'react';
import io from 'socket.io-client';
import config from '../utils/config';
import { Actions } from '../types/actions';
import { Action } from '../types/actionTypes';

const socket = io(config.SERVER_URL);

export const useRooms = (dispatch: React.Dispatch<Action>) => {
    useEffect(() => {
        socket.on('room_users', (users: string[]) => {
            dispatch({ type: Actions.SetUsers, payload: users });
        });

        return () => {
            socket.off('room_users');
        };
    }, [dispatch]);

    return socket;
};
