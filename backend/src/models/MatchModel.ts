import shortId from "shortid";
import PlayerModel from "./PlayerModel";
import { getCookieIdentifier } from "Helper";
import GameModel from "./GameModel";

class MatchModel {
    id: string;
    playerOne: PlayerModel;
    playerTwo: PlayerModel;
    playArea: Array<string | false> = [false, false, false, false, false, false, false, false, false];
    nextMove: string;
    winner: null | string = null;

    constructor(playerOne: PlayerModel, playerTwo: PlayerModel) {
        this.id = shortId.generate()
        this.playerOne = playerOne;
        this.playerTwo = playerTwo;
        this.nextMove = playerOne.id;

        playerOne.socket?.emit("newMatch", this);
        playerTwo.socket?.emit("newMatch", this);
    }

    makeMove = (identifier: string, position: number) => {
        if (this.playArea[position] !== false) return;
        if (identifier !== this.nextMove) return;

        this.playArea[position] = identifier;
        this.nextMove = this.playerOne.id === identifier ? this.playerTwo.id : this.playerOne.id;

        const possibleWinner = this.getPossibleWinner();
        if (possibleWinner !== false) {
            this.winner = possibleWinner;
            this.playerOne.socket!.emit("matchFinished", this);
            this.playerTwo.socket!.emit("matchFinished", this);
            GameModel.matchFinished(this.id);
        }

        this.playerOne.socket!.emit("newMove", this);
        this.playerTwo.socket!.emit("newMove", this);
    }

    private getPossibleWinner = (): string | false => {
        // Rows
        if (this.isWinnerRowColumnDiagonal(0, 1, 2)) return this.playArea[0];
        if (this.isWinnerRowColumnDiagonal(3, 4, 5)) return this.playArea[3];
        if (this.isWinnerRowColumnDiagonal(6, 7, 8)) return this.playArea[6];

        // Columns
        if (this.isWinnerRowColumnDiagonal(0, 3, 6)) return this.playArea[0];
        if (this.isWinnerRowColumnDiagonal(1, 4, 7)) return this.playArea[1];
        if (this.isWinnerRowColumnDiagonal(2, 5, 8)) return this.playArea[2];

        // Diagonals
        if (this.isWinnerRowColumnDiagonal(0, 4, 8)) return this.playArea[0];
        if (this.isWinnerRowColumnDiagonal(2, 4, 6)) return this.playArea[2];

        return false;
    }

    /**
     * @returns false if no winner.
     * @returns player id if there is a winner.
     */
    private isWinnerRowColumnDiagonal = (i1: number, i2: number, i3: number): boolean => {
        if (this.playArea[i1] === false || this.playArea[i2] === false || this.playArea[i3] === false) return false;
        if (this.playArea[i1] === this.playArea[i2] && this.playArea[i1] === this.playArea[i3]) return true;
        return false; // Wont really get here (i think?) but TS is not smart enough.
    }
}

export default MatchModel;