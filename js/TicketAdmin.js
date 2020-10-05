const usuario = document.querySelector('#CorreoEspecialista');
const rowsTabla = document.querySelector('#dataTableAdmin');
var rowtableadmin='';

let usuarioSession = JSON.parse(sessionStorage.getItem("userSesion"));
if (!usuarioSession) {
  window.document.location = '../index.html';
}
usuario.innerHTML = "Administrador : " + usuarioSession.NombreUsuario;

axios({
  method: 'get',
  url: 'http://localhost:3000/obtenerTicketsPendientes/'
}).then(response => {
  console.warn(response.data);
  obtieneTickets(response.data);
});

const obtieneTickets = (data) =>{
    
    
    if(data.length){
        
        let html1 = ''; 
        var Estatusword = '';
        
        data.forEach(ticket => {

                switch(ticket.EstatusTicket){
                  case 1:
                    Estatusword = '<td class="text-primary">Pendiente</td>';
                    break;
                  case 2:
                    Estatusword = '<td class="text-success">Abierto</td>';
                    break;
                  case 3:
                    Estatusword = '<td class="text-warning">En Proceso</td>';
                    break;
                  case 4:
                    Estatusword = '<td class="text-danger">Finalizado</td>';
                    break;
                  case 5:
                    Estatusword = '<td class="text-verify">Verificado</td>';
                    break;
                  case 6:
                    Estatusword = '<td class="text-dark">Terminado</td>';
                    break;
                  default:
                    break;
                }
            
            rowtableadmin = `
            <tr onclick='Ticketview("${ticket.IdTicket}")'>
              <td>${ticket.NombreTicket}</td>
              <td>${ticket.PinDepartamento ? ticket.PinDepartamento : "Sin Departamento" }</td>
              <td>${ticket.Categoria ? ticket.Categoria : "Sin Categoria"}</td>
              <td>${ticket.SubCat ? ticket.SubCat : "Sin Subcategoria"}</td>
              ${Estatusword}
            </tr>
            `;

            html1 += rowtableadmin;

        });

        
        rowsTabla.innerHTML = html1;

    }
    else{
        
    }
 };

salir.addEventListener('click', (e)=>{
    e.preventDefault();
    sessionStorage.clear();
    return window.document.location = '../index.html';

});

function Ticketview(ticketid){
  sessionStorage.setItem("Ticketview",ticketid);
  window.document.location = './TicketDescriptionAdmin.html';
}







