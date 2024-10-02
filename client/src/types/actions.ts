import { UserActionTypes } from './actionTypes';
import { User } from './userState';

export interface SetUserAction {
    type: UserActionTypes.SET_USERS,
    payload: User[],
}

export interface JoinRoomAction {
    type: UserActionTypes.JOIN_ROOM,
    payload: { userId: string },
}

export interface LeaveRoomAction {
    type: UserActionTypes.LEAVE_ROOM,
    payload: { userId: string },
}

export type UserAction = SetUserAction | JoinRoomAction | LeaveRoomAction;
