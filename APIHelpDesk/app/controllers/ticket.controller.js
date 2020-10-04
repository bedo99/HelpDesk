const Ticket = require("../models/ticket.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    } else {
        // Create a Customer
        let ArchivoAdjuntoTicket = req.files.ArchivoAdjuntoTicket;
        let nombreArchivo = `${ArchivoAdjuntoTicket.size}_${ArchivoAdjuntoTicket.name}`;
        ArchivoAdjuntoTicket.mv("./files/" + nombreArchivo);
        const ticket = new Ticket({
            NombreTicket: req.body.NombreTicket,
            DescripcionTicket: req.body.DescripcionTicket,
            ArchivoAdjuntoTicket: nombreArchivo,
            IdUsuario_Creador: req.body.IdUsuario_Creador
        });

        Ticket.create(ticket, (err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the Customer."
                });
            else res.status(200).send(data);
        });
    }
};


exports.obtenerporCreador = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    } else {
        // Create a Customer
        const ticket = new Ticket({
            IdUsuario_Creador: req.body.IdUsuario_Creador
        });

        Ticket.obtenerporCreador(ticket, (err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Error al obtener tickets"
                });
            else res.status(200).send(data.res[0]);
        });
    }
};
