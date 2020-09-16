const express = require('express')
const User = require('../users/user-moudle')

const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const router = express.Router()


router.post("/register", (req, res) => {
    const credentials = req.body;

        const rounds = process.env.BCRYPT_ROUNDS || 8;

        // hash the password
        const hash = bcryptjs.hashSync(credentials.password, rounds);

        credentials.password = hash;

        // save the user to the database
        User.add(credentials)
            .then(user => {
                const token = makeJwt(user);

                res.status(201).json({ data: user, token });
            })
            .catch(error => {
                res.status(500).json({ message: error.message });
            });
});

router.post("/login", (req, res) => {
    const { username, password } = req.body;
        User.findBy({ username })
            .then(([user]) => {
                // compare the password the hash stored in the database
                if (user && bcryptjs.compareSync(password, user.password)) {
                    const token = makeJwt(user);

                    res.status(200).json({ token });
                } else {
                    res.status(401).json({ message: "Invalid credentials" });
                }
            })
            .catch(error => {
                res.status(500).json({ message: error.message });
            });
});


function makeJwt({ id, username}) {
    const payload = {
        username,
         id,
    };
    const config = {
        jwtSecret: process.env.JWT_SECRET || "is it secret, is it safe?",
    };
    const options = {
        expiresIn: "8 hours",
    };

    return jwt.sign(payload, config.jwtSecret, options);
}

module.exports = router