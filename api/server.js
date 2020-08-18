const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

const authRouter = require('../auth/auth-router')
const usersRouter = require('../users/users-router')
const server = express()
const restricted = require('../auth/restricted-middleware')

server.use(helmet())
server.use(express.json())
server.use(cors())

server.use('/api/auth', authRouter);
server.use('./api/users', restricted, usersRouter)

server.get('/', (req, res) => {
    res.json({ api: 'up' })
})

module.exports = server