import http from 'http';
import express, { Request, Response, NextFunction } from 'express';
import { Server, Socket } from 'socket.io';
import { corsOptions } from './config/corsConfig';
import healthCheckRoutes from './routes/healthCheck';
import cors from 'cors';
import { logRequest } from './middleware/logging';
import { userSocketHandler } from './sockets/userSockets';
import { roomSocketHandler } from './sockets/roomSockets';

const app = express();
const httpServer = http.createServer(app);

// https://socket.io/docs/v4/how-it-works/
    // At a given interval the server sends a PING packet and the client has a few seconds (the
    // pingTimeOut value) to send a PONG back. If the server does not receive a PONG packet back,
    // it will consider the connection closed.
    // Conversely, if the client does not receive a PING packet within pingInterval + pingTimeout,
    // it will consider that the connection is closed.
    // pingInterval: 1_000,
    // pingTimeout: 500, // PONG packet - if the client
// serveClient: false,
// cookie: false,
const io = new Server(httpServer, {cors: corsOptions });

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // does this match the manual config?
app.use(logRequest);
// Error middleware?

// I think use(cors()) has replaced this...
// app.use((req: Request, res: Response, next: NextFunction) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

//     if (req.method === 'OPTIONS') {
//         res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
//         return res.status(200).json({});
//     };

//     next();
// });

// Routes
app.use(healthCheckRoutes);

// Initialise Socket.IO for users
userSocketHandler(io);
roomSocketHandler(io);

// Start the server
const PORT = 3100;
httpServer.listen(PORT, () => console.info(`Server is running on port ${PORT}`));
