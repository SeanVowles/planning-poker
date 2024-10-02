import React from 'react';
import { User } from '../types/userState';

interface UserListProps {
    users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
    return (
        <div>
            <h3>Connected Users</h3>
            <ul>
                {users.length > 0 ? (
                    users.map((user) => (
                        <li key={user.id}>
                            {user.id} {user.isInRoom ? '(In Room)' : '(Not in Room)'}
                        </li>
                    ))
                ) : (
                    <li>No users connected</li>
                )}
            </ul>
        </div>
    )
};

export default UserList;
