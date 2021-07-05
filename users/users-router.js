const router = require('express').Router();

const Users = require('./users-model')
const restricted = require('../auth/restricted-middleware')

router.use(restricted)

router.get('/', (req, res) => {
    Users.find()
    .then(users => {
        res.status(200).json({ data: users, jwt: req.decodedToken })
    })
    .catch(error => res.send(error))
})

router.put('/:id', restricted, (req, res) => {
    res.status(200).json({ hello: 'you made it!' })
})

module.exports = router