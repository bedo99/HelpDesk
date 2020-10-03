const sql = require("./db.js");

// constructor
const Usuario = function (usuario) {
    this.IdUsuario = usuario.idUsuario
    this.NombreUsuario = usuario.NombreUsuario;
    this.Correo = usuario.Correo;
    this.Contrasena = usuario.Contrasena;
    this.Telefono = usuario.Telefono;
    this.NombreEmpresa = usuario.NombreEmpresa;
    this.IdTipoUsuario = usuario.IdTipoUsuario;
    this.IdCatalogoEmpresa = usuario.IdCatalogoEmpresa;
    this.Estatus = usuario.Estatus;
};


Usuario.create = (nuevoUsuario, resultado) => {
    sql.query(`CALL registroUsuario ('${nuevoUsuario.NombreUsuario}', '${nuevoUsuario.Correo}', '${nuevoUsuario.Contrasena}', '${nuevoUsuario.Telefono}', '${nuevoUsuario.NombreEmpresa}');`,(err, res) =>{
        if(err){
            console.log("error: ", err);
            resultado(err, null);
            return;
        }
        console.log("Usuario Registrado Correctamente", { res });
        resultado(null, { res });
    } )
};



Usuario.login = (existenteUsuario, resultado) =>{
    sql.query(`CALL login ('${existenteUsuario.Correo}', '${existenteUsuario.Contrasena}');`,(err, res) =>{
        if(err){
            console.log("error: ", err);
            resultado(err, null);
            return;
        }
        console.log("Login Realizado Correctamente", { res });
        resultado(null, { res });
    } )
}


module.exports = Usuario;