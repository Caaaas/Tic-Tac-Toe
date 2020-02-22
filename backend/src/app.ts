import dotenv from "dotenv";
const env = dotenv.config({});
if (env.error)
    throw env.error;

import cors from "cors";
import path from "path";
import express from "express";
import http from "http";
import socketIO from "socket.io";
import expressSession from "express-session";
import cookieParser from "cookie-parser";
import CookieMiddleware from "CookieMiddleware";
import SocketHandler from "SocketHandler";

const app = express();
const server = http.createServer(app);
const io = socketIO.listen(server);

const sessionOptions = {
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: true,
    cookie: {
        path: '/',
        httpOnly: true,
        secure: true,
        secret: process.env.COOKIE_SECRET!,
        saveUninitialized: true,
        resave: true
    }
};

import sharedSession from "express-socket.io-session";

// Middlewares
app.use(express.json());
app.use(cors());
app.use(expressSession(sessionOptions));
io.use(sharedSession(expressSession(sessionOptions), {
    autoSave: true
}));
app.use(cookieParser());
app.use(CookieMiddleware);

app.use("/", express.static(path.join(__dirname, '../../frontend/dist')))

io.on('connection', socket => {
    console.log("Connected")
    new SocketHandler(socket, io);
});

// Start the application
const port = parseInt(process.env.PORT_SERVER!) || 3000;
server.listen(port, function () {
    console.log("SERVER started on port " + port);
});