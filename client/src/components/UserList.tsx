import React from 'react';

interface UserListProps {
    users: string[];
    isInRoom: boolean;
}

const UserList: React.FC<UserListProps> = ({ users, isInRoom }) => {
    return (
        <div>
            <h3>Connected Users</h3>
            {!isInRoom ? (
                <p>You are not in a room</p>
            ) : (
                <ul>
                    {users.length > 0 ? (
                        users.map((userId) => <li key={userId}>{userId}</li>)
                    ) : (
                        <li>No users connected</li>
                    )}
                </ul>
            )}
        </div>
    )
};

export default UserList;
