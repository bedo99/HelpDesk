module.exports = app => {
    const ticket = require("../controllers/ticket.controller.js");

    app.post("/registroTicket", (req, res) => {
        ticket.create(req, res);
    });

    app.post("/obtenerTicketsporCreador", (req, res) => {
        ticket.obtenerporCreador(req, res);
    });


    app.get("/obtenerTicketsPendientes", (req, res) => {
        ticket.obtenerPendientes(req, res);
    });

    app.post("/obtenerTicket", (req, res) => {
        ticket.obtenerTicket(req, res);
    });

    app.post("/obtenerAdjuntoTicket", (req, res) => {
        ticket.obtenerAdjunto(req, res);
    });
};