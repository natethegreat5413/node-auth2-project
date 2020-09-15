const bcryptjs = require('bcryptjs')
const router = require('express').Router()
const jwt = require('jsonwebtoken')

const Users = require('../users/user-model')
const { isValid } = require('../users/user-service')

// const makeJWT = require('../jwt')


// REGISTER NEW USER
    router.post('/register', (req, res) => {
        const creds = req.body;

        if(isValid(creds)){
            const rounds = process.env.BCRYPT_ROUNDS || 8;

            // hash the password
            const hash = bcryptjs.hashSync(creds.password, rounds);
            creds.password = hash;

            // save the user to the database
            Users.add(creds)
                .then(user => {
                    res.status(201).json({ data: user })
                })
                .catch(error => {
                    res.status(500).json({ message: error.message })
                })
        } else {
            res.status(400).json({ message: "Please provide username and password." })
        }
    })

    // LOGIN
    router.post('/login', (req, res) => {
        const { username, password } = req.body;

        if(isValid(req.body)){
            Users.findBy({ username: username })
                .then(([user]) => {
                    if(user && bcryptjs.compareSync(password, user.password)){
                        const token = generateToken(user);

                        res.status(200).json(token)
                    } else {
                        res.status(401).json({ message: "invalid credentials" })
                    }
                })
                .catch(error => {
                    res.status(500).json({ message: error.message })
                });
        } else {
            res.status(400).json({ message: "Please provide username and password" })
        }
    })

    function generateToken({id, username, departments}){
        const payload = {
            username,
            departments,
            subject: id
        }
        const config = {
            jwtSecret: process.env.JWT_SECRET || 'is it secret, is it safe?'
        }
        const options = {
            expiresIn: '1d'
        }

        return jwt.sign(payload, config.jwtSecret, options)
    }

    module.exports = router;