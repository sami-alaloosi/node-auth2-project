const express = require('express')
const server = express()
const bcryptjs = require('bcryptjs')

const userRouter = require('../users/user-router')
const authRouter = require('../auth/auth-router')
server.use(express.json())

// testing  if the api is up and running
server.get("/", (req, res) => {
    const password = req.headers.password;
    const rounds = process.env.BCRYPT_ROUNDS || 4; 
    const hash = bcryptjs.hashSync(password, rounds);
    res.json({ api: "up", password, hash });
})

server.use('/api/users', userRouter)
server.use('/api/auth', authRouter)


module.exports = server;