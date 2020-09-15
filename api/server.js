const express = require('express')
const server = express()
const helmet = require('helmet')
const cors = require('cors')

const dbConfig = require('../data/dbConfig')
const userRouter = require('../users/user-router')
const authRouter = require('../auth/auth-router')

server.use(helmet())
server.use(express.json())
server.use(cors())

server.use('/api/auth', authRouter)
server.use('/api/users', userRouter)


server.get('/', (req, res) => {
    res.send({ API: "It's up my man!" })
})

module.exports = server