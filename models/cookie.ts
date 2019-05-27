const express = require('express');

module.exports = function (req, res, next) {
    var cookie = req.cookies[process.env.COOKIE_IDENTIFIER_NAME];

    if (cookie === undefined) {
        let randomNumber: string = Math.random().toString();
        randomNumber = randomNumber.substring(2, randomNumber.length);
        res.cookie(cookieName, randomNumber, {
            maxAge: 2147483647,
            httpOnly: true
        });
    }

    next();
};