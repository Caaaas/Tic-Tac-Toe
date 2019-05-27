class Game {
    private playerOne: Player;
    private playerTwo: Player;
    private key: string;

    constructor(playerOne: Player, playerTwo: Player, key: string) {
        this.playerOne = playerOne;
        this.playerTwo = playerTwo;
        this.key = key;
    }
}

module.exports.Game;