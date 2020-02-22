import { Socket, Server } from "socket.io";
import GameModel from "models/GameModel";
import { getCookieIdentifier } from "Helper";

class SocketHandler {
    constructor(socket: Socket, io: Server) {
        socket.on('disconnect', () => {
            console.log("disconnect.")

            const asd = io.sockets.sockets;
            // TODO ONLY TEMP FOR DEV
            GameModel.clear();
        });

        socket.on("playRandom", name => {
            GameModel.playRandom(socket, name);
            console.log("Play vs random.")
        });

        socket.on("createLobby", () => {
            console.log("create lobby.")
        });

        socket.on("joinLobby", lobbyKey => {
            console.log("join lobby.")
        });

        socket.on("makeMove", position => {
            if (typeof position !== "number" || isNaN(position) || position < 0 || position > 8) return;
            const identifier = getCookieIdentifier(socket);
            if (!identifier) return;
            const match = GameModel.getMatch(identifier);
            if (!match) return;
            if (match.winner !== null) return;
            match.makeMove(identifier, position);
        })
    }
}

export default SocketHandler;