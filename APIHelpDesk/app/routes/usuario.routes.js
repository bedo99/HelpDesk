module.exports = app => {
    const usuario = require("../controllers/usuario.controller.js");
  
    // Registro de Usuario
    app.post("/registroUsuario", (req, res) => {
        usuario.create(req, res);
    });
  
  };