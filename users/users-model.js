const db = require('../database/connection')

module.exports = {
    add,
    find,
    findBy,
    findById,
}

function find(){
    return db('users as u')
        .join('departments as d', 'u.deparment', 'd.id')
        .select('u.id', 'u.username', 'd.name as department')
        .orderBy('u.id')
}

function findById(filter){
    return db('users as u')
        .join('departments as d', 'u.department', 'd.id')
        .where(filter)
        .select('u.id', 'u.username', 'd.name as role', 'u.password')
        .orderBy('u.id')
}

async function add(user){
    try {
        const [id] = await db('users').insert(user, 'id');
        return findById(id)
    }
}