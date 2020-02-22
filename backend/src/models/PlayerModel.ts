import { Socket } from "socket.io";
import { getCookieIdentifier } from "Helper";

class PlayerModel {
    id: string;
    name: string;
    socket: Socket | undefined;

    constructor(name: string, socket: Socket) {
        const socketAny: any = socket;
        this.id = getCookieIdentifier(socket)!;
        this.name = name;
        this.socket = socket;

        socket.emit("player", this);
    }

    toJSON = () => {
        const clone = {... this};
        clone.socket = undefined;
        return clone;
    }
}

export default PlayerModel;