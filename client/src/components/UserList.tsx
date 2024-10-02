import React from 'react';
import { User } from '../types/userState';
import { Box, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';
import CloseIcon from "@mui/icons-material/Close"

interface UserListProps {
    users: User[];
    onRemoveUser: (userId: string) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onRemoveUser }) => {
    return (
        <Box sx={{ p: 2, width: '33%' }}>
            <Typography variant="h5" gutterBottom>
                Connected Users
            </Typography>
            <List>
                {users.length > 0 ? (
                    users.map((user) => (
                        <ListItem key={user.socketId} sx={{ borderBottom: '1px solid #ccc' }}>
                            <ListItemText
                                primary={`${user.nickname || '' }`}
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
                    ))
                ) : (
                    <ListItem>
                        <ListItemText
                            primary='No users connected'
                        />
                    </ListItem>
                )}
            </List>
        </Box>
    )
};

export default UserList;
