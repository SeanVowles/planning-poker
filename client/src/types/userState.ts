export interface User {
    socketId: string;
    isInRoom: boolean;
    nickname: string;
    roomName?: string;
}

export interface UsersState {
    users: User[];
}
