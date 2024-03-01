const { expressjwt: jwt } = require("express-jwt");

exports.verifyToken = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"]
})