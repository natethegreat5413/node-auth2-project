const router = require('express').Router()
const Users = require('../users/user-model')
const restricted = require('../auth/restrictedMW')


router.get('/', restricted, (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(error => {
            res.send(error)
        })
})



module.exports = router;