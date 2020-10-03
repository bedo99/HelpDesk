const tituloT = document.querySelector('#tituloticket');
const DescrT = document.querySelector('#Descripcionticket');
var NombreSolicitante = document.querySelector('#NombreSolicitante');
const buttonestatus = document.querySelector('#dropdownMenuButton');
const dropdown = document.querySelector('#DropDown');
const btnCambios = document.querySelector('#btnCambios');
const usuario = document.querySelector('#CorreoEspecialista');

var mistorage = window.localStorage;
console.log(mistorage);

var id = localStorage.getItem('Ticketview');
let html = '';
var Cambiosestatus='';

auth.onAuthStateChanged( user =>{

    if(user){
        usuario.innerHTML = user.email;
    }
    else{}

});

salir.addEventListener('click', (e)=>{
    e.preventDefault();
    auth.signOut().then(()=>{
        localStorage.clear();
        return window.document.location = '../index.html';
    });

});

var docRef = db.collection('Tickets').doc(id);
docRef.get()
.then((doc) => {
    if (doc.exists) {

        tituloT.innerHTML = doc.data().NombreT;
        DescrT.innerHTML = doc.data().DescripcionT;
        switch(doc.data().Estatus){
            case 0:
                buttonestatus.innerHTML = "Pendiente";
                Cambiosestatus = 
                `
                <a class="dropdown-item text-success" >Abierto</a>
                <a class="dropdown-item text-warning" >En Proceso</a>
                <a class="dropdown-item text-danger" >Finalizado</a>
                <a class="dropdown-item text-verify" >Verificado</a>
                <a class="dropdown-item text-dark" >Terminado</a>
                `;
                html += Cambiosestatus;
              break;
            case 1:
                buttonestatus.innerHTML = "Abierto";
                Cambiosestatus = 
                `
                <a class="dropdown-item text-warning" >En Proceso</a>
                `;
                html += Cambiosestatus;
              break;
            case 2:
                buttonestatus.innerHTML = "En Proceso";
                Cambiosestatus = 
                `
                <a class="dropdown-item text-danger">Finalizado</a>
                `;
                html += Cambiosestatus;
              break;
            case 3:
                buttonestatus.innerHTML = "Finalizado";
                Cambiosestatus = 
                `
                <a class="dropdown-item text-verify">Verificado</a>
                <a class="dropdown-item text-dark" >Terminado</a>
                `;
                html += Cambiosestatus;
              break;
            case 4:
                buttonestatus.innerHTML = "Verificado";
                Cambiosestatus = 
                `
                <a class="dropdown-item text-dark">Terminado</a>
                `;
                html += Cambiosestatus;
              break;
            case 5:
                buttonestatus.innerHTML = "Terminado";
                Cambiosestatus = 
                `
                <a class="dropdown-item text-dark" >Terminado</a>
                `;
                html += Cambiosestatus;
              break;
            default:
              break;
        }
        
        dropdown.innerHTML = html;
        Obteneradjutno(doc.data().Adjunto);

        var docRefU = db.collection('Usuarios').doc(doc.data().IdSolicitante)
        docRefU.get()
        .then((user) => {
            NombreSolicitante.innerHTML = user.data().Nombre;
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });

        
        
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});

btnCambios.addEventListener('click', (e)=>{
    e.preventDefault();

    var mivalor = document.querySelector('#dropdownMenuButton').textContent;
    switch(mivalor){
        case "Pendiente":
            db.collection('Tickets').doc(id).update({
                Estatus: 0
            }).then((e)=>{
                return window.document.location = './Especialista.html';
            });
          break;
        case "Abierto":
            db.collection('Tickets').doc(id).update({
                Estatus: 1
            }).then((e)=>{
                return window.document.location = './Especialista.html';
            });
          break;
        case "En Proceso":
            db.collection('Tickets').doc(id).update({
                Estatus: 2
            }).then((e)=>{
                return window.document.location = './Especialista.html';
            });
          break;
        case "Finalizado":
            db.collection('Tickets').doc(id).update({
                Estatus: 3
            }).then((e)=>{
                return window.document.location = './Especialista.html';
            });
          break;
        case "Verificado":
            db.collection('Tickets').doc(id).update({
                Estatus: 4
            }).then((e)=>{
                return window.document.location = './Especialista.html';
            });
          break;
        case "Terminado":
            db.collection('Tickets').doc(id).update({
                Estatus: 5
            }).then((e)=>{
                return window.document.location = './Especialista.html';
            });
          break;
        default:
          break;
      }

});

let html3 = '';
const Obteneradjutno = (data) => {
  var s = data.split(".");
        if(s[1].toLowerCase()  == "mp4"){
          storage.ref().child(data).getDownloadURL().then((url) => {
          
            
            var video = document.getElementById('Adjunto');
            const v = 
            `
            <h2>Adjuntos</h2>
            <video src="${url}" width="320"  height="240" controls></video>
            `;
            html3 += v;
            video.innerHTML = html3;
  
          }).catch(function(error) {
            // Handle any errors
          });
        }
        else if(s[1].toLowerCase()  == "mp3" || s[1].toLowerCase()  == "mpeg"){
          storage.ref().child(data).getDownloadURL().then((url) => {
          
            
            var Audio = document.getElementById('Adjunto');
            const audio = 
            `
            <h2>Adjuntos</h2>
            <audio src="${url}" controls></audio>
            `;
            html3 += audio;
            Audio.innerHTML = html3;
  
          }).catch(function(error) {
            // Handle any errors
          });
        }
        else if(s[1].toLowerCase()  == "jpg" || s[1].toLowerCase()  == "png" || s[1].toLowerCase()  == "jpeg"){
          storage.ref().child(data).getDownloadURL().then((url) => {
          
            var image = document.getElementById('Adjunto');
            const imagen = 
            `
            <h2>Adjuntos</h2>
            <img src="${url}"></img>
            `;
            html3 += imagen;
            image.innerHTML = html3;
            
            
  
          }).catch(function(error) {
            // Handle any errors
          });
        }
}