module.exports = app => {
    const usuario = require("../controllers/usuario.controller.js");
    const ticket = require("../controllers/ticket.controller.js");

    // Registro de Usuario
    app.post("/registroUsuario", (req, res) => {
        usuario.create(req, res);
    });

    app.post("/loginUsuario", (req, res) => {
        usuario.login(req, res);
    });  
};