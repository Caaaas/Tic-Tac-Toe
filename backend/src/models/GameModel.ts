import PlayerModel from "./PlayerModel";
import { Socket } from "socket.io";
import { getCookieIdentifier } from "Helper";
import MatchModel from "./MatchModel";

class GameModel {
    private static queue: Array<PlayerModel> = [];
    private static matches: Array<MatchModel> = [];

    private static allowedJoinMatchQueueLobby = (socket: Socket, name: string): boolean => {
        const playerIdentifier = getCookieIdentifier(socket);

        if (!playerIdentifier) return false;
        if (typeof name !== "string" || name.length < 1) return false;
        if (GameModel.queue.some(player => player.id === playerIdentifier)) return false;
        if (GameModel.matches.some(match => match.playerOne.id === playerIdentifier || match.playerTwo.id === playerIdentifier)) return false;

        return true;
    }

    static playRandom = (socket: Socket, name: string) => {
        if (!GameModel.allowedJoinMatchQueueLobby(socket, name)) return;

        const player = new PlayerModel(name, socket);
        if (GameModel.queue.length === 0) {
            GameModel.queue.push(player)
            socket.emit("joinedRandomQueue");
            return;
        }

        const opponent = GameModel.queue.shift() as PlayerModel;
        const match = new MatchModel(opponent, player);
        GameModel.matches.push(match);
    }

    static getMatch = (playerIdentifier: string) => {
        const match = GameModel.matches.find(match => match.playerOne.id === playerIdentifier || match.playerTwo.id === playerIdentifier);
        if (match) return match;

        return null;
    }

    static clear = () => {
        GameModel.matches = [];
        GameModel.queue = [];
    }

    static matchFinished = (id: string) => {
        GameModel.matches = GameModel.matches.filter(match => match.id !== id);
    }
}

export default GameModel;