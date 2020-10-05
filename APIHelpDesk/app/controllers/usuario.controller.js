const Usuario = require("../models/usuario.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    } else {
        // Create a Customer
        const usuario = new Usuario({
            NombreUsuario: req.body.NombreUsuario,
            Correo: req.body.Correo,
            Contrasena: req.body.Contrasena,
            Telefono: req.body.Telefono,
            NombreEmpresa: req.body.NombreEmpresa
        });

        Usuario.create(usuario, (err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the Customer."
                });
            else res.status(200).send(data);
        });
    }
};


exports.login = (req, res) => {
    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }else {
        const usuario = new Usuario({
            Correo: req.body.Correo,
            Contrasena: req.body.Contrasena,
        });

        Usuario.login(usuario, (err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Error al iniciar sesión"
                });
            else res.status(200).send(data);
        });
    }
} 


exports.obtenerEspecialistas = (req, res) => {
    Usuario.obtenerEspecialistas((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Error al obtener especialistas"
            });
        else res.status(200).send(data);
    });
} 