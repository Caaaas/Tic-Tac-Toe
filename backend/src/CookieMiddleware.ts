import shortId from "shortid";
import { Request, Response, NextFunction } from "express";

const CookieMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const cookieName: string = process.env.COOKIE_IDENTIFIER_NAME!;
    if (typeof req.cookies[cookieName] === "undefined") {
        res.cookie(cookieName, shortId.generate(), {
            maxAge: 2147483647,
            httpOnly: true
        });
    }

    next();
}

export default CookieMiddleware;