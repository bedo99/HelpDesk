const sql = require("./db.js");

// constructor
const Ticket = function (ticket) {
    this.IdTicket = ticket.IdTicket
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

Ticket.obtenerporCreador = (Ticket, resultado) => {
    sql.query(`CALL AllTicketByUsuarioCreador (${Ticket.IdUsuario_Creador});`,(err, res) =>{
        if(err){
            console.log("error: ", err);
            resultado(err, null);
            return;
        }
        console.log("Tickets obtenidos correctamente", { res });
        resultado(null, { res });
    } )
};

Ticket.obtenerPendientes = ( resultado ) => {
    sql.query(`CALL obtenerTicketsPendientes;`,(err, res) =>{
        if(err){
            console.log("error: ", err);
            resultado(err, null);
            return;
        }
        console.log("Tickets obtenidos correctamente", { res });
        resultado(null, { res });
    } )
}


Ticket.obtenerTicket = (Ticket, resultado) => {
    sql.query(`CALL TicketBYId (${Ticket.IdTicket});`,(err, res) =>{
        if(err){
            console.log("error: ", err);
            resultado(err, null);
            return;
        }
        console.log("Tickets obtenidos correctamente", { res });
        resultado(null, { res });
    } )
};


module.exports = Ticket;