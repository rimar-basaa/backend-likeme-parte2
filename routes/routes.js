const express = require('express');
const { traerPosts, agregarPosts, likePosts, borrarPosts, validaRegistro } = require('../consultas');
const router = express.Router();

router.get("/posts", async (req, res) => {
    try {
        const { rows, rowCount } = await traerPosts();
        if (rowCount > 0) {
            res.status(200).json(rows);            
        } else {
            res.status(200).json({
                registros: rowCount,
                message: 'No hay registros para mostrar'
            });
        };
        
    } catch (error) {
        res.status(404).json({
            message: "No se pudo procesar obtencion de los posts, intente mas tarde",
            codigo: error.code
        });        
    };    
});


router.post("/posts", async (req, res) => {
    try {
        const { titulo, url, descripcion } = req.body;
        if (titulo && url && descripcion) {
            await agregarPosts(titulo, url, descripcion);
            res.status(200).json({ message: "Posts agregado" });
        } else {
            res.status(400).json({ message: "Todos los campos son obligatorios" });
        };
        
    } catch (error) {
        res.status(404).json({
            message: "No se pudo procesar agregar post, intente mas tarde",
            codigo: error.code
        });        
    };   
});


router.put("/posts/like/:id", async (req, res) => {
    const { id } = req.params;
    try {
        if (id > 0) {
            const post = await validaRegistro(id);
            if (!post[0]) {
                res.status(400).json({ message: "Id NO existe" });
            } else {
                await likePosts(id);
                res.status(200).json({ message: "Like agregado con exito" });
            };
        } else {
            res.status(400).json({ message: "Un NUMERO Id es requerido, NO puede ser 0" });
        };
        
    } catch (error) {
        res.status(404).json({
            message: "No se pudo procesar agregar like, intente mas tarde",
            codigo: error.code
        });        
    }; 
});

router.put("/posts/like", (req, res) => {
    res.status(400).json({
        message: "En la peticion falta el ID a modificar"
    });
});


router.delete("/posts/:id", async (req, res) => {
    const { id }= req.params;
    try {
        if (id > 0) {
            const post = await validaRegistro(id);
            if (!post[0]) {
                res.status(400).json({ message: "Id NO existe" });
            } else {
                await borrarPosts(id);
                res.status(200).json({ message: "Post eliminado con exito" });
            };
        } else {
            res.status(400).json({ message: "Un NUMERO Id es requerido, NO puede ser 0" });
        };
        
    } catch (error) {
        res.status(404).json({
            message: "No se pudo procesar la eliminacion, intente mas tarde",
            codigo: error.code
        });        
    };   
});

router.delete("/posts", (req, res) => {
    res.status(400).json({
        message: "En la peticion falta el ID a eliminar"
    });
});



module.exports = router;