
// module.exports = function makeJWT({id, username, department}){
//         const payload = {
//             username,
//             department,
//             subject: id
//         }
//         const config = {
//             jwtSecret: process.env.JWT_SECRET || 'is it secret, is it safe?'
//         }
//         const options = {
//             expiresIn: '1 hour'
//         };

//         return jwt.sign(payload, config.jwtSecret, options)
//     }
