
export default function() {

    const mysql = require('mysql2')
    const pool = mysql.createPool({
        host: process.env.DB_HOSTNAME,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    })
    return pool;
}

