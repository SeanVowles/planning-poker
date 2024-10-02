import cors from 'cors';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { corsOptions } from './config/corsConfig';
import { logRequest } from './middleware/logging';
import healthCheckRoutes from './routes/healthCheck';
import { roomSocketHandler } from './sockets/roomSockets';
import { userSocketHandler } from './sockets/userSockets';

const app = express();
const httpServer = http.createServer(app);

const io = new Server(httpServer, {cors: corsOptions });

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // does this match the manual config?
app.use(logRequest); // This only works on the /ping endpoint.
// Error middleware?

// Routes
app.use(healthCheckRoutes);

// Initialise Socket.IO for users
userSocketHandler(io);
roomSocketHandler(io);

// Start the server
const PORT = 3100;
httpServer.listen(PORT, () => console.info(`Server is running on port ${PORT}`));
