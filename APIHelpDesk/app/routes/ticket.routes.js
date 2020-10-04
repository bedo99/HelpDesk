module.exports = app => {
    const ticket = require("../controllers/ticket.controller.js");

    app.post("/registroTicket", (req, res) => {
        ticket.create(req, res);
    });

    app.post("/obtenerTicketsporCreador", (req, res) => {
        ticket.obtenerporCreador(req, res);
    });
  
};