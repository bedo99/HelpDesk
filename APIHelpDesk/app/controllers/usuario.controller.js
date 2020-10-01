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
            else res.send(data);
        });
    }


};