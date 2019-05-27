const GamesContainer = require.main.require('./models/gamesContainer.js').GamesContainer;

const cookieName = process.env.COOKIE_IDENTIFIER_NAME;

let SocketHandler = class SocketHandler {
    constructor(socket) {
        var identifierCookie = socket.handshake.cookies[cookieName];

        // if a user refreshes the page, I want to remember their state, and their session/id. Maybe a cookie?

        socket.on('disconnect', function () {
            console.log("disconnect.")
        });

        socket.on("play vs random", function () {
            console.log("Play vs random.")
            GamesContainer.joinRandomLobby(socket);
        });

        socket.on("create lobby", function () {
            console.log("create lobby.")
        });

        socket.on("join lobby", function (key) {
            console.log("join lobby.")
        });
    }
}

module.exports.SocketHandler = SocketHandler;