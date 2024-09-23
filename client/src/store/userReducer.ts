import { Actions } from '../types/actions';
import { Action } from '../types/actionTypes';
import { UserState } from '../types/userState';

export const initialState: UserState = {
    users: [],
    room: null,
};

export const userReducer = (state: UserState = initialState, action: Action): UserState => {
    switch (action.type) {
        case Actions.SetUsers:
            return {
                ...state,
                users: action.payload,
            };
        case Actions.ClearUsers:
            return {
                ...state,
                users: [],
            };
        case Actions.JoinRoom:
            return {
                ...state,
                room: action.payload,
            };
        case Actions.LeaveRoom:
            return {
                ...state,
                room: null,
            };
        default:
            return state;
    }
};
