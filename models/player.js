let cookieName = process.env.COOKIE_IDENTIFIER_NAME;
class Player {
    constructor(name, socket) {
        this.name = name;
        this.identifier = socket.handshake.cookies[cookieName];
    }
}
module.exports.Player;
