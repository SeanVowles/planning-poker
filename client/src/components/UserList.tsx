import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';
import React from 'react';
import { User } from '../types/userState';

interface UserListProps {
    users: User[];
    onRemoveUser: (userId: string) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onRemoveUser }) => {
    const usersByRoom = users.reduce<{ [roomName: string]: User[] }>((acc, user) => {
        const roomName = user.isInRoom ? user.roomName || 'Unnamed Rom' : 'Not in Room';
        if (!acc[roomName]) {
            acc[roomName] = [];
        }
        acc[roomName].push(user);
        return acc;
    }, {});

    return (
        <Box sx={{ p: 2, width: '33%' }}>
            <Typography variant="h5" gutterBottom>
                Connected Users
            </Typography>

            {Object.keys(usersByRoom).length > 0 ? (
                Object.entries(usersByRoom).map(([roomName, roomUsers]) => (
                    <Box key={roomName} sx={{ mb: 3 }}>
                        <Typography variant='h6'>{roomName}</Typography>
                        <List>
                            {roomUsers.map((user) => (
                                <ListItem key={user.socketId} sx={{ borderBottom: '1px solid #ccc' }}>
                                    <ListItemText
                                        primary={`${user.nickname || ''}`}
                                        secondary={`${user.isInRoom ? '(In Room)' : '(Not in Room)'} - (Socket ID: ${user.socketId})`}
                                    />
                                    <IconButton
                                        edge='end'
                                        aria-label='remove'
                                        onClick={() => onRemoveUser(user.socketId)}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                ))
            ) : (
                <List>
                    <ListItem>
                        <ListItemText
                            primary='No users connected'
                        />
                    </ListItem>
                </List>
            )}
        </Box>
    )
};

export default UserList;
