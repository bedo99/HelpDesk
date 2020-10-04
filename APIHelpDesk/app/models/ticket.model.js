const sql = require("./db.js");

// constructor
const Ticket = function (ticket) {
    this.IdTicket = ticket.idUsuario
    this.NombreTicket = ticket.NombreTicket;
    this.DescripcionTicket = ticket.DescripcionTicket;
    this.ArchivoAdjuntoTicket = ticket.ArchivoAdjuntoTicket;
    this.EstatusTicket = ticket.EstatusTicket;
    this.FechaInicioTicket = ticket.FechaInicioTicket;
    this.FechaTerminadoTicket = ticket.FechaTerminadoTicket;
    this.IdUsuario_Creador = ticket.IdUsuario_Creador;
    this.IdUsuario_Especialista = ticket.IdUsuario_Especialista;
    this.IdSubCategoria = ticket.IdSubCategoria;
};


Ticket.create = (nuevoTicket, resultado) => {
    sql.query(`CALL InsertarTicket ('${nuevoTicket.NombreTicket}', '${nuevoTicket.DescripcionTicket}', '${nuevoTicket.ArchivoAdjuntoTicket}', ${nuevoTicket.IdUsuario_Creador});`,(err, res) =>{
        if(err){
            console.log("error: ", err);
            resultado(err, null);
            return;
        }
        console.log("Ticket Registrado Correctamente", { res });
        resultado(null, { res });
    } )
};


module.exports = Ticket;