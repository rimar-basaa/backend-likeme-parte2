const pool = require('./config_db/dbase');

const traerPosts = async () => {
    const resultado = await pool.query("SELECT * FROM posts ORDER BY id");
    return resultado;
};

const agregarPosts = async (titulo, img, descripcion, likes = 0) => {
    const consulta = "INSERT INTO posts VALUES (DEFAULT, $1, $2, $3, $4)";
    const { rows } = await pool.query(consulta, [titulo, img, descripcion, likes]);
    return rows;
};

const likePosts = async (id) => {
    const consulta = "SELECT * FROM posts WHERE id = $1";
    const { rows } = await pool.query(consulta, [id]);
    const data = rows[0].likes + 1;
    const consulta2 = "UPDATE posts SET likes = $1 WHERE id = $2";
    await pool.query(consulta2, [data, id]);   
};

const borrarPosts = async (id) => {
    const consulta = "DELETE FROM posts WHERE id = $1";
    await pool.query(consulta, [id]);
};

const validaRegistro = async (id) => {
    const consulta = "SELECT * FROM posts WHERE id = $1";
    const { rows } = await pool.query(consulta, [id]);
    return rows;
};


module.exports = { traerPosts, agregarPosts, likePosts, borrarPosts, validaRegistro };