import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useUsers } from '../hooks/useUsers';
import UserList from './UserList';

const RoomManager: React.FC = () => {
    const [roomName, setRoomName] = useState('');
    const [nickname, setNickname] = useState('');
    const { users, joinRoom, leaveRoom, removeUser } = useUsers();

    const handleJoinRoom = () => {
        if (roomName && nickname) {
            joinRoom(roomName, nickname);
        }
    };

    const handleLeaveRoom = () => {
        if (roomName) {
            leaveRoom(roomName);
        }
    };

    const handleRemoveUser = (userId: string) => {
        removeUser(userId);
    }

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Room Manager
            </Typography>

            <Box mb={2}>
                <TextField
                    label='Room Name'
                    variant='outlined'
                    fullWidth
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <TextField
                    label='Nickname'
                    variant='outlined'
                    fullWidth
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                />
            </Box>

            <Box mb={2}>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={handleJoinRoom}
                    sx={{ mr: 2 }}
                >
                    Join Room
                </Button>
                <Button
                    variant='outlined'
                    color='secondary'
                    onClick={handleLeaveRoom}
                >
                    Leave Room
                </Button>
            </Box>

            <UserList users={users} onRemoveUser={handleRemoveUser} />
        </Box>
    );
};

export default RoomManager;
