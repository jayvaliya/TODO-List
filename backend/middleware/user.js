const jwt = require("jsonwebtoken");
const jwtPassword = process.env.jwtPassword;

function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    try {
        const token = req.headers['authorization'];
        // console.log(token);
        const decoded = jwt.verify(token, jwtPassword);
        if (decoded) {
            // there is a small bug in the next line. be careful
            req.email=decoded;
            next();
        } else {
            res.status(411).json({ msg: "Invalid token" });
        }
    } catch (err) {
        // res.json({ msg: "Internal server error in authentication" });
        res.status(500).json(err);
    }
}

module.exports = userMiddleware;