const dotenv = require('dotenv');
const dotenvParseVariables = require('dotenv-parse-variables');
const env = dotenv.config({});
if (env.error)
    throw env.error;
process.env = dotenvParseVariables(env.parsed);

const cors = require('cors');
const path = require('path');

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
var cookieParser = require("cookie-parser");

const session = require('express-session');
const sessionOptions = {
    key: null,
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
};

const sharedSession = require('express-socket.io-session');

// Middlewares
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')))
app.use(session(sessionOptions));
app.use(cookieParser());

const SocketHandler = require('./socket/index.js').SocketHandler;
io.on('connection', function(socket) {
    new SocketHandler(socket);
});

var cookieMiddleware = require('./models/cookie.js');
app.use(cookieMiddleware);

app.get("/", function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

// Start the application
const port = process.env.PORT_SERVER || 5000;
server.listen(port, function() {
    console.log("SERVER started on port " + port);
});

io.use(sharedSession(session(sessionOptions), {
    autoSave: true
}));