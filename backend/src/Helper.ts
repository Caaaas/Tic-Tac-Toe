import { Socket } from "socket.io";

const getCookieIdentifier = (socket: Socket): string | null => {
    const socketAny: any = socket;

    if (socketAny?.handshake?.cookies[process.env.COOKIE_IDENTIFIER_NAME!] && typeof socketAny.handshake.cookies[process.env.COOKIE_IDENTIFIER_NAME!] === "string" && socketAny.handshake.cookies[process.env.COOKIE_IDENTIFIER_NAME!].length > 0) {
        return socketAny.handshake.cookies[process.env.COOKIE_IDENTIFIER_NAME!];
    }
    return null;
}

export {
    getCookieIdentifier
}