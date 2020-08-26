auth.onAuthStateChanged( user =>{

    if(user){
        
        localStorage.setItem("idU",user.uid);
        

        db.collection('Tickets').onSnapshot(snapshot =>{
            obtieneTickets(snapshot.docs);
            //console.log(snapshot.docs);
            //configuraMenu(user);IdUsuarioEspecialista
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

const obtieneTickets = (data) =>{
    
    
    if(data.length){

        let html = '';
        const id = localStorage.getItem("idU");

        var contadorP = 0;
        var contadorA = 0;
        var contadorE = 0;
        var contadorF = 0;
        var contadorV = 0;
        var contadorT = 0;

        data.forEach(ticket => {
            if(ticket.data().IdUsuarioEspecialista == id){
                if(ticket.data().Estatus == 0){
                    contadorP++;
                }
                else if(ticket.data().Estatus == 1){
                    contadorA++;
                }
                else if(ticket.data().Estatus == 2){
                    contadorE++;
                }
                else if(ticket.data().Estatus == 3){
                    contadorF++;
                }
                else if(ticket.data().Estatus == 4){
                    contadorV++;
                }
                else if(ticket.data().Estatus == 5){
                    contadorT++;
                }
            }
        });
        
        if(contadorP != 0){
            const CardP = 
            `
            <div class="col-xl-3 col-md-6 mb-4">
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
            <div class="col-xl-3 col-md-6 mb-4">
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
            <div class="col-xl-3 col-md-6 mb-4">
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
            <div class="col-xl-3 col-md-6 mb-4">
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
            <div class="col-xl-3 col-md-6 mb-4">
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
            <div class="col-xl-3 col-md-6 mb-4">
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