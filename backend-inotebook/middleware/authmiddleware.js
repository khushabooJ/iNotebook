const jwt = require("jsonwebtoken");
const user = require("../db/Usermodel");

const authentication = (req, res, next) => {
    try {


        const token = req.header("auth-token")
        if (!token) {
            res.status(401).send({ error: "Please authenticate using a valid token" })
        }

        const verifyUser = jwt.verify(token, process.env.REACT_APP_JWT_TOKEN)

        req.user = verifyUser;
        req.token = token;
        next();

    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }

}

module.exports = authentication;