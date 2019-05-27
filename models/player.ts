let cookieName: string = process.env.COOKIE_IDENTIFIER_NAME;

class Player {
    private name: string;
    private identifier: string;
    private socket;

    constructor(name: string, socket) {
        this.name = name;
        this.identifier = socket.handshake.cookies[cookieName];
    }
}

module.exports.Player;