import { Actions } from './actions';

export interface SetUserAction {
    type: Actions.SetUsers,
    payload: string[],
}

export interface ClearUserAction {
    type: Actions.ClearUsers,
}

export interface JoinRoomAction {
    type: Actions.JoinRoom,
    payload: string,
}

export interface LeaveRoomAction {
    type: Actions.LeaveRoom,
    payload: string | null,
}

export type Action = SetUserAction | ClearUserAction | JoinRoomAction | LeaveRoomAction;
