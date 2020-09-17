const db = require("../data/connection");

module.exports = {
    add,
    find,
    findBy,
    findById,
};

function find() {
    return db("user").select("id", "username").orderBy("id");
}

function findBy(filter) {
    return db("user").where(filter).orderBy("id");
    // return db("users as u")
    //     .where(filter)
    //     .orderBy("u.id")
    //     .join("roles as r", "r.id", "u.role")
    //     .select("u.id", "u.username", "u.password", "r.name as role");
}

async function add(user) {
    try {
        const [id] = await db("user").insert(user, "id");

        return findById(id);
    } catch (error) {
        throw error;
    }
}

function findById(id) {
    return db("user").where({ id }).first();
}