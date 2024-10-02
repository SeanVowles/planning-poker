export interface User {
    socketId: string;
    isInRoom: boolean;
    nickname: string;
}

export interface UsersState {
    users: User[];
    socketId: string | null;
}
