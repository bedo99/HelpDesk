const usuario = document.querySelector('#CorreoEspecialista');
const ListaTicketsCard = document.querySelector('#ListaTicketsCard');
const rowsTabla = document.querySelector('#dataTableEmpresa');
const btnCrearTarea = document.querySelector('#btnCrearTarea');
const TituloTarea = document.querySelector('#TituloTarea');
const DescripcionTarea = document.querySelector('#DescripcionTarea');

const FileButton = document.querySelector('#FileButton');
var file;

let usuarioSession = JSON.parse(sessionStorage.getItem("userSesion"));
if(!usuarioSession){
  window.document.location = '../index.html';
}
usuario.innerHTML = usuarioSession.NombreUsuario;


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

                switch(ticket.data().Estatus){
                  case 0:
                    contadorP++;
                    Estatusword = '<td class="text-primary">Pendiente</td>';
                    break;
                  case 1:
                    contadorA++;
                    Estatusword = '<td class="text-success">Abierto</td>';
                    break;
                  case 2:
                    contadorE++;
                    Estatusword = '<td class="text-warning">En Proceso</td>';
                    break;
                  case 3:
                    contadorF++;
                    Estatusword = '<td class="text-danger">Finalizado</td>';
                    break;
                  case 4:
                    contadorV++;
                    Estatusword = '<td class="text-verify">Verificado</td>';
                    break;
                  case 5:
                    contadorT++;
                    Estatusword = '<td class="text-dark">Terminado</td>';
                    break;
                  default:
                    break;
                }
            
            const rowtableespecialista = `
            <tr onclick='Ticketview("${ticket.id}")'>
              <td>${ticket.data().NombreT}</td>
              <td>${ticket.data().DescripcionT}</td>
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
                      <div class="text-xs font-weight-bold text-dark text-uppercase mb-1">No has realizado Tareas</div>
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
        sessionStorage.clear();
        return window.document.location = '../index.html';
    });

});

function Filtrar(estatus){
  if(estatus==6){
    db.collection('Tickets').where('IdUsuarioEspecialista', '==', localStorage.getItem("idU"))
        .get()
        .then((querySnapshot) => {
          obtieneTickets(querySnapshot.docs);
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
    });
  }
  else{
    db.collection('Tickets').where('IdUsuarioEspecialista', '==', localStorage.getItem("idU"))
    .where('Estatus', '==', estatus)
        .get()
        .then((querySnapshot) => {
          obtieneTicketsFiltro(querySnapshot.docs,estatus);
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
    });
  }
  
}

const obtieneTicketsFiltro = (data,estatus) =>{
    
  if(data.length){
      
      var Estatusword = '';
      let html1 = '';
      data.forEach(ticket => {

        switch(estatus){
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
          
          
          const rowtableespecialista = `
          <tr onclick='Ticketview("${ticket.id}")'>
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
  window.document.location = './TicketDescriptionEmpresa.html';
}

btnCrearTarea.addEventListener('click',(e) => {
  e.preventDefault();

  
  var t = document.querySelector('#TituloTarea').value;
  var d = document.querySelector('#DescripcionTarea').value;

  var metadata = {
    contentType: file.type
  }
  var StorageRef = storage.ref('folder_imagenes/' + file.name);
  StorageRef.put(file,metadata);

  
  db.collection('Tickets').add({
    NombreT: t,
    DescripcionT: d,
    Categoria: "Sin Asignar",
    SubCat: "Sin Asignar",
    Estatus: 0,
    IdSolicitante: localStorage.getItem("idU"),
    IdUsuarioEspecialista: "",
    PinDepartamento: "SDep",
    Adjunto: StorageRef.fullPath
  });

});


FileButton.addEventListener('change', (e)=>{
  
  file = e.target.files[0];

  
});






