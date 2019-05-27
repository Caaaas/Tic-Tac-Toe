const Game = require.main.require('./models/game.js').Game;

let queue = [];
let games = [];

let queueHasPlayers = function() {
    return queue.length > 0;
}

let addToQueue = function(socket) {
    queue.push(socket);
}

let addGame = function(game) {
    games.push(game);
}

let playerIsInQueue = function(newPlayer) {
    for (var i = 0; i < queue.length; i++) {
        if (queue[i].handshake.cookies[process.env.COOKIE_IDENTIFIER_NAME] == newPlayer.handshake.cookies[process.env.COOKIE_IDENTIFIER_NAME]) {
            return true;
        }
    }

    return false;
}

let createLobbyKey = function (length) {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;

    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    if (!lobbyKeyExists(result))
        return result;
    else
        return createLobbyKey(length);
}

let lobbyKeyExists = function(key) {
    var duplicate = false;
    for (const lobby of lobbies) {
        console.log("key," + key + " . " + lobby.key)

        if (lobby.key === key) {
            return true;
        }
    }

    return false;;
}

let joinRandomLobby = function(socket) {
    console.log(playerIsInQueue(socket))
    if (!queueHasPlayers()) {
        addToQueue(socket);

        socket.emit("joined random queue");
    } else if (!playerIsInQueue(socket)) {
        let opponent = queue[0];
        queue.shift();
        let game = new Game(opponent.id, socket.id);

        addGame(game);

        socket.emit("new game", game);
        opponent.emit("new game", game);
    } else {
        socket.emit("joined random queue");
    }
}

exports.GamesContainer = {
    queueHasPlayers,
    createLobbyKey,
    lobbyKeyExists,
    joinRandomLobby
};