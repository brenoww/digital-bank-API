const { Pool } = require("pg");

const pool = new Pool({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "post123**",
    database: "dindin",
});

module.exports = pool;
