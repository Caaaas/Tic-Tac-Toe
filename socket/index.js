const GamesContainer = require.main.require('./models/gamesContainer.js').GamesContainer;

let SocketHandler = class SocketHandler {
    constructor(socket) {
        // if a user refreshes the page, I want to remember their state, and their session/id. Maybe a cookie?

        console.log("user connected to socket.");
        console.log("id: " + socket.id)
        console.log("client.id: " + socket.client.id)
        console.log("handshake.id: " + socket.handshake.id)
        console.log("\n\n")

        socket.on('disconnect', function () {
            console.log("user disconnected from socket.")
            console.log("id: " + socket.id)
            console.log("client.id: " + socket.client.id)
            console.log("handshake.id: " + socket.handshake.id)
            console.log("\n\n")
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