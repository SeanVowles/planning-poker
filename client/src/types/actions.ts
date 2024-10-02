import { UserActionTypes } from './actionTypes';
import { User } from './userState';

export interface SetUserAction {
    type: UserActionTypes.SET_USERS,
    payload: User[],
}

export interface JoinRoomAction {
    type: UserActionTypes.JOIN_ROOM,
    payload: { socketId: string, nickname: string },
}

export interface LeaveRoomAction {
    type: UserActionTypes.LEAVE_ROOM,
    payload: { socketId: string },
}

export type UserAction = SetUserAction | JoinRoomAction | LeaveRoomAction;
