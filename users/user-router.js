const express = require('express')
const User = require('./user-moudle')
const router = express.Router()
const jwt = require("jsonwebtoken")

// get all users
router.get('/', restricted, (req, res)=>{
    User.find()
    .then(users => res.status(200).json({data: users}))
    .catch(erorr => res.status(500).json({eroorMessage: erorr.message}))
})


 // middleware
 function restricted (req, res, next) {
    const token = req.headers.authorization;
    const secret = process.env.JWT_SECRET || "is it secret, is it safe?";

    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            if (err) {
                res.status(401).json({ message: "Not Allowed" });
            } else {
                req.jwt = decodedToken;

                next();
            }
        });
    } else {
        res.status(401).json({ message: "No token!" });
    }
}

module.exports = router

