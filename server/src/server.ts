import http from 'http';
import express, { Request, Response, NextFunction } from 'express';
import { Server, Socket } from 'socket.io';

/** Express app */
const app = express();

/** Server Handling */
const httpServer = http.createServer(app);

/** Initialize Socket.io on the server */
const io = new Server(httpServer, {
    serveClient: false,
    // https://socket.io/docs/v4/how-it-works/
    // At a given interval the server sends a PING packet and the client has a few seconds (the
    // pingTimeOut value) to send a PONG back. If the server does not receive a PONG packet back,
    // it will consider the connection closed.
    // Conversely, if the client does not receive a PING packet within pingInterval + pingTimeout,
    // it will consider that the connection is closed.
    // pingInterval: 1_000,
    // pingTimeout: 500, // PONG packet - if the client
    cookie: false,
    cors: {
        origin: '*', // adjust as per your front end origin
        methods: ['PUT', 'POST', 'PATCH', 'DELETE', 'GET'],
    },

});

/** Master list of all connected users */
const connectedUsers = new Set<string>();

/** Track connected users */
io.on('connection', (socket: Socket) => {
    console.info('User connected: ', socket.id);

    // Add the user to the set of connected users
    connectedUsers.add(socket.id);

    // Handle disconnection
    socket.on('disconnect', () => {
        console.info('User disconnected: ', socket.id);
        connectedUsers.delete(socket.id);
    });
});

/** Log the request */
app.use((req: Request, res: Response, next: NextFunction) => {
    console.info(`METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);


    res.on('finish', () => {
        console.info(`METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    });

    next();
});

/** Parse the body of the request */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/** Rules of our API */
app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    };

    next();
});

/** Health check */
app.get('/ping', (_, res: Response) => {
    console.info(`Before setting status: ${res.statusCode}`); // Should be 200 by default
    res.status(200);
    res.json({ hello: 'world!' });
    console.info(`After setting status: ${res.statusCode}`); // Should be 200 explicitly set
});

/** Socket Information */
app.get('/status', (_, res: Response, next: NextFunction) => {
    return res.status(200).json({ users: Array.from(connectedUsers) });
});

/** Error handling */
app.use((_, res: Response) => {
    const error = new Error('Not found');

    res.status(404);
    res.json({ message: error.message });
});

/** Listen */
httpServer.listen(3100, () => console.info('Server is running.'));
