auth.onAuthStateChanged( user =>{

    if(user){
        

        localStorage.setItem("idU",user.uid);
        const usuario = document.getElementById('CorreoEspecialista');
        usuario.innerHTML = user.email;
        

        db.collection('Tickets').where("IdUsuarioEspecialista", "==", localStorage.getItem("idU"))
        .onSnapshot(snapshot =>{
            obtieneTickets(snapshot.docs);

        }, err => {
            console.log(err.message);
        });

    }
    else{
        console.log('Usuario salió');
        obtieneTickets([]);
        //configuraMenu();
    }

});

const ListaTicketsCard = document.getElementById('ListaTicketsCard');
var rowsTabla = document.getElementById("dataTableEspecialista");
var mistorage = window.localStorage;
console.log(mistorage);
const obtieneTickets = (data) =>{
    
    
    if(data.length){
        
        let html = '';
        let html1 = ''; 
        var Estatusword = '';
        var contadorP = 0;
        var contadorA = 0;
        var contadorE = 0;
        var contadorF = 0;
        var contadorV = 0;
        var contadorT = 0;
        
        data.forEach(ticket => {
            
                if(ticket.data().Estatus == 0){
                    contadorP++;
                    Estatusword = '<td class="text-primary">Pendiente</td>';
                }
                else if(ticket.data().Estatus == 1){
                    contadorA++;
                    Estatusword = '<td class="text-success">Abierto</td>';
                }
                else if(ticket.data().Estatus == 2){
                    contadorE++;
                    Estatusword = '<td class="text-warning">En Proceso</td>';
                }
                else if(ticket.data().Estatus == 3){
                    contadorF++;
                    Estatusword = '<td class="text-danger">Finalizado</td>';
                }
                else if(ticket.data().Estatus == 4){
                    contadorV++;
                    Estatusword = '<td class="text-verify">Verificado</td>';
                }
                else if(ticket.data().Estatus == 5){
                    contadorT++;
                    Estatusword = '<td class="text-dark">Terminado</td>';
                }
            
            
            const rowtableespecialista = `
            <tr onclick='Ticketview("${ticket.id}")'>
              <td>${ticket.data().NombreSolicitante}</td>
              <td>${ticket.data().NombreT}</td>
              <td>${ticket.data().PinDepartamento}</td>
              <td>${ticket.data().Categoria}</td>
              <td>${ticket.data().SubCat}</td>
              ${Estatusword}
            </tr>
            `;

            html1 += rowtableespecialista;

        });

        const CardT = 
            `
            
            <div onclick='Filtrar(6)' class="col-xl-3 col-md-6 mb-4">
              <div class="card border-left-light shadow h-100 py-2">
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div class="text-xs font-weight-bold text-dark text-uppercase mb-1">Todo</div>
                      <div class="h5 mb-0 font-weight-bold text-gray-800"></div>
                    </div>
                    <div class="col-auto">
                      <i class="fas fa-clipboard-list fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            `;
        html += CardT;

        if(contadorP != 0){
            const CardP = 
            `
            
            <div onclick='Filtrar(0)' class="col-xl-3 col-md-6 mb-4">
              <div class="card border-left-primary shadow h-100 py-2">
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">Pendiente</div>
                      <div class="h5 mb-0 font-weight-bold text-gray-800">${contadorP}</div>
                    </div>
                    <div class="col-auto">
                      <i class="fas fa-clipboard-list fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            `;
            html += CardP;
        }
        if(contadorA != 0){
            const CardA = 
            `
            <div  onclick='Filtrar(1)' class="col-xl-3 col-md-6 mb-4">
              <div class="card border-left-success shadow h-100 py-2">
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div class="text-xs font-weight-bold text-success text-uppercase mb-1">Abierto</div>
                      <div class="h5 mb-0 font-weight-bold text-gray-800">${contadorA}</div>
                    </div>
                    <div class="col-auto">
                      <i class="fas fa-clipboard-list fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            `;
            html += CardA;
        }
        if(contadorE != 0){
            const CardE = 
            `
            <div onclick='Filtrar(2)' class="col-xl-3 col-md-6 mb-4">
              <div class="card border-left-warning shadow h-100 py-2">
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">En Proceso</div>
                      <div class="h5 mb-0 font-weight-bold text-gray-800">${contadorE}</div>
                    </div>
                    <div class="col-auto">
                      <i class="fas fa-clipboard-list fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            `;
            html += CardE;
        }
        if(contadorF != 0){
            const CardF = 
            `
            <div onclick='Filtrar(3)' class="col-xl-3 col-md-6 mb-4">
              <div class="card border-left-danger shadow h-100 py-2">
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div class="text-xs font-weight-bold text-danger text-uppercase mb-1">Finalizado</div>
                      <div class="h5 mb-0 font-weight-bold text-gray-800">${contadorF}</div>
                    </div>
                    <div class="col-auto">
                      <i class="fas fa-clipboard-list fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            `;
            html += CardF;
        }
        if(contadorV != 0){
            const CardV = 
            `
            <div onclick='Filtrar(4)' class="col-xl-3 col-md-6 mb-4">
              <div class="card border-left-verify shadow h-100 py-2">
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div class="text-xs font-weight-bold text-verify text-uppercase mb-1">Verificado</div>
                      <div class="h5 mb-0 font-weight-bold text-gray-800">${contadorV}</div>
                    </div>
                    <div class="col-auto">
                      <i class="fas fa-clipboard-list fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            `;
            html += CardV;
        }
        if(contadorT != 0){
            const CardT = 
            `
            <div onclick='Filtrar(5)' class="col-xl-3 col-md-6 mb-4">
              <div class="card border-left-dark shadow h-100 py-2">
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div class="text-xs font-weight-bold text-dark text-uppercase mb-1">Terminado</div>
                      <div class="h5 mb-0 font-weight-bold text-gray-800">${contadorT}</div>
                    </div>
                    <div class="col-auto">
                      <i class="fas fa-clipboard-list fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            `;
            html += CardT;
        }

        ListaTicketsCard.innerHTML = html;
        rowsTabla.innerHTML = html1;

    }
    else{
        const No = 
            `
            <div class="col-xl-3 col-md-6 mb-4">
              <div class="card border-left-dark shadow h-100 py-2">
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div class="text-xs font-weight-bold text-dark text-uppercase mb-1">No Tienes Asignados</div>
                      <div class="h5 mb-0 font-weight-bold text-gray-800"></div>
                    </div>
                    <div class="col-auto">
                      <i class="fas fa-clipboard-list fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            `;
        ListaTicketsCard.innerHTML = No; 
    }
 };

 salir.addEventListener('click', (e)=>{
    e.preventDefault();
    auth.signOut().then(()=>{
        localStorage.clear();
        return window.document.location = '../index.html';
    });

});

function Filtrar(estatus){
  if(estatus==6){
    db.collection('Tickets').where("IdUsuarioEspecialista", "==", localStorage.getItem("idU"))
      .onSnapshot(snapshot =>{
        obtieneTickets(snapshot.docs);

      }, err => {
        console.log(err.message);
    });
  }
  else{
    db.collection('Tickets').where("IdUsuarioEspecialista", "==", localStorage.getItem("idU"))
    .where("Estatus", "==", estatus)
      .onSnapshot(snapshot =>{
          obtieneTicketsFiltro(snapshot.docs,estatus);
      }, err => {
          console.log(err.message);
    });
  }
  
}

const obtieneTicketsFiltro = (data,estatus) =>{
    
  if(data.length){
      
      var Estatusword = '';
      let html1 = '';
      data.forEach(ticket => {

          if(estatus == 0){
            Estatusword = '<td class="text-primary">Pendiente</td>';
          }
          else if(estatus == 1){
            Estatusword = '<td class="text-success">Abierto</td>';
          }
          else if(estatus == 2){
            Estatusword = '<td class="text-warning">En Proceso</td>';
          }
          else if(estatus == 3){
            Estatusword = '<td class="text-danger">Finalizado</td>';
          }
          else if(estatus == 4){
            Estatusword = '<td class="text-verify">Verificado</td>';
          }
          else if(estatus == 5){
            Estatusword = '<td class="text-dark">Terminado</td>';
          }
          
          
          const rowtableespecialista = `
          <tr onclick='Ticketview("${ticket.id}")'>
            <td>${ticket.data().NombreSolicitante}</td>
            <td>${ticket.data().NombreT}</td>
            <td>${ticket.data().PinDepartamento}</td>
            <td>${ticket.data().Categoria}</td>
            <td>${ticket.data().SubCat}</td>
            ${Estatusword}
          </tr>
          `;

          html1 += rowtableespecialista;

      });
      
      rowsTabla.innerHTML = html1;

  }
  
};



function Ticketview(ticketid){
  localStorage.setItem("Ticketview",ticketid);
  window.document.location = './TicketDescriptionEspecialista.html';
}







