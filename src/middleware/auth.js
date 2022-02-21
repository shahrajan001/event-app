const jwt = require("jsonwebtoken");
const User = require("../models/user");
const jwtsecret = process.env.JWT_SECRET;

const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", ""); 
        const decoded = jwt.verify(token, jwtsecret);
        const user = await User.findOne({
            _id: decoded._id,
            "tokens.token": token,
        }); 
        if (!user || !decoded) {
            throw new Error("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
        }
        console.log("user:------");

        req.token = token;
        req.user = user;
        console.log("authentication token done");
        next();
    } catch (e) {
        res.status(401).send({ error: "please authenticate" });
    }
};

module.exports = auth;
