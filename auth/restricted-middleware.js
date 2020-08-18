const jwt = require('jsonwebtoken')

const constants = require('../config/constants')

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    if(token){
        jwt.verify(token, constants.jwtSecret, (error, decodedToken) => {
            if(error) {
                res.status(401).json({ you: "shall not pass!"})
            }else{
                req.jwt = decodedToken;
                next()
            }
        })
    }else{
        res.status(401).json({ message: 'Please provide credentials' })
    }
}