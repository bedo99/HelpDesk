const tituloT = document.querySelector('#tituloticket');
const DescrT = document.querySelector('#Descripcionticket');
var NombreEspecialista = document.querySelector('#NombreEspecialista');
const estatustarea = document.querySelector('#Estatus');
const usuario = document.querySelector('#CorreoEmpresa');

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
                estatustarea.innerHTML = "Pendiente";
                estatustarea.className = "text-primary";
              break;
            case 1:
                estatustarea.innerHTML = "Abierto";
                estatustarea.className = "text-success";
                
              break;
            case 2:
                estatustarea.innerHTML = "En Proceso";
                estatustarea.className = "text-warning";
                
              break;
            case 3:
                estatustarea.innerHTML = "Finalizado";
                estatustarea.className = "text-danger";
                
              break;
            case 4:
                estatustarea.innerHTML = "Verificado";
                estatustarea.className = "text-verify";
               
              break;
            case 5:
                estatustarea.innerHTML = "Terminado";
                estatustarea.className = "text-dark";
               
              break;
            default:
              break;
        }
        
        Obteneradjutno(doc.data().Adjunto);

        var docRefU = db.collection('Usuarios').doc(doc.data().IdUsuarioEspecialista)
        docRefU.get()
        .then((user) => {
            NombreEspecialista.innerHTML = user.data().Nombre;
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
        
    }
}).catch((error) => {
    console.log("Error getting document:", error);
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
