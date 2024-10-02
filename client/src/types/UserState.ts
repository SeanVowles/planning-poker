export interface User {
    id: string;
    isInRoom: boolean;
}

export interface UsersState {
    users: User[];
}
