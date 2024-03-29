const { Pool } = require('pg');
require("dotenv").config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: 5432,
    //para cerrar la conexion inmediatamente despues de la consulta
    allowExitOnIdle: true
});

/*
//prueba de conexion con Base dato
const getData = async () => {
    const res = await pool.query("select NOW()");
    console.log(res.rows);
};

getData();
*/

module.exports = pool;