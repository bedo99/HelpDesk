const usuario = document.querySelector('#CorreoEspecialista');
const rowsTabla = document.querySelector('#dataTableAdmin');
var rowtableadmin='';

auth.onAuthStateChanged( user =>{

    if(user){
        
        localStorage.setItem("idU",user.uid);
        usuario.innerHTML = "Administrador : " + user.email;

        db.collection('Tickets').where('IdUsuarioEspecialista', '==', "")
        .where('Estatus', '==', 0)
        .get()
        .then((querySnapshot) => {
          obtieneTickets(querySnapshot.docs);
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });

    }
    else{
        console.log('Usuario salió');
        obtieneTickets([]);
    }

});


var mistorage = window.localStorage;
console.log(mistorage);

const obtieneTickets = (data) =>{
    
    
    if(data.length){
        
        let html1 = ''; 
        var Estatusword = '';
        
        data.forEach(ticket => {

                switch(ticket.data().Estatus){
                  case 0:
                    Estatusword = '<td class="text-primary">Pendiente</td>';
                    break;
                  case 1:
                    Estatusword = '<td class="text-success">Abierto</td>';
                    break;
                  case 2:
                    Estatusword = '<td class="text-warning">En Proceso</td>';
                    break;
                  case 3:
                    Estatusword = '<td class="text-danger">Finalizado</td>';
                    break;
                  case 4:
                    Estatusword = '<td class="text-verify">Verificado</td>';
                    break;
                  case 5:
                    Estatusword = '<td class="text-dark">Terminado</td>';
                    break;
                  default:
                    break;
                }
            
            rowtableadmin = `
            <tr onclick='Ticketview("${ticket.id}")'>
              <td>${ticket.data().NombreT}</td>
              <td>${ticket.data().PinDepartamento}</td>
              <td>${ticket.data().Categoria}</td>
              <td>${ticket.data().SubCat}</td>
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
    auth.signOut().then(()=>{
        localStorage.clear();
        return window.document.location = '../index.html';
    });

});

function Ticketview(ticketid){
  localStorage.setItem("Ticketview",ticketid);
  window.document.location = './TicketDescriptionAdmin.html';
}







