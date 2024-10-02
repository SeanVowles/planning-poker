import { UserActionTypes } from '../types/actionTypes';
import { UserAction } from '../types/actions';
import { UsersState } from '../types/userState';

export const userReducer = (state: UsersState, action: UserAction): UsersState => {
    switch (action.type) {
        case UserActionTypes.SET_USERS:
            return {
                ...state,
                users: action.payload,
            };
        case UserActionTypes.JOIN_ROOM:
            return {
                ...state,
                users: state.users.map(user =>
                    user.id === action.payload.userId
                        ? { ...user, isInRoom: true }
                        : user
                ),
            };
        case UserActionTypes.LEAVE_ROOM:
            return {
                ...state,
                users: state.users.map(user =>
                    user.id === action.payload.userId
                        ? { ...user, isInRoom: false }
                        : user),
            };
        default:
            return state;
    }
};
