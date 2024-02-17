const jwt = require("jsonwebtoken");
const jwtPassword = process.env.jwtPassword;

function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    try {
        const token = req.headers['authorization'];
        const decoded = jwt.verify(token, jwtPassword);
        if (decoded.email) {
            req.email=decoded.email;
            next();
        } else {
            res.json({ msg: "Invalid token." });
        }
    } catch (err) {
        res.json({ msg: "Internal server error in authentication." });
    }
}

module.exports = userMiddleware;