

const tituloT = document.querySelector('#tituloticket');
const DescrT = document.querySelector('#Descripcionticket');
var NombreSolicitante = document.querySelector('#NombreSolicitante');
const dropdown = document.querySelector('#DropDown');
const btnCambios = document.querySelector('#btnCambios');
const btnCategoria = document.querySelector('#dropdowncategoria');
const btnSubCategoria = document.querySelector('#dropdownSubCategoria');
const usuario = document.querySelector('#CorreoEspecialista');
const usuariosEspecialista = document.querySelector('#selectp');


var id = localStorage.getItem('Ticketview');
let html = '';
var Cambiosestatus='';

auth.onAuthStateChanged( user =>{

    if(user){
        usuario.innerHTML = "Administrador : " + user.email;
        db.collection('Usuarios').where('Estatus','==',1)
        .get()
        .then((useresp) =>{
            obtenerUE(useresp.docs);
        })
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

        var s = doc.data().Adjunto.split(".");
        if(s[1] == "mp4"){
          storage.ref().child(doc.data().Adjunto).getDownloadURL().then((url) => {
          
            
            var video = document.getElementById('myvideo');
            video.src = url;
  
          }).catch(function(error) {
            // Handle any errors
          });
        }
        else if(s[1] == "mp3" || s[1] == "mpeg"){
          storage.ref().child(doc.data().Adjunto).getDownloadURL().then((url) => {
          
            
            var audio = document.getElementById('myaudio');
            audio.src = url;
  
          }).catch(function(error) {
            // Handle any errors
          });
        }
        else if(s[1] == "jpg" || s[1] == "png" || s[1] == "jpeg"){
          storage.ref().child(doc.data().Adjunto).getDownloadURL().then((url) => {
          
            
            var img = document.getElementById('myimg');
            img.src = url;
  
          }).catch(function(error) {
            // Handle any errors
          });
        }
        

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



const obtenerUE = (data) =>{
    if(data.length){
        let html = '';
        var rowespecialista = '';
        data.forEach(usuario => {
            rowespecialista = `
                <option class="dropdown-item text-dark" value="${usuario.id}">${usuario.data().Nombre}</option>
            `;
            html += rowespecialista;
        });
        usuariosEspecialista.innerHTML = html;
    }
}

btnCategoria.addEventListener('click',(e)=>{
    btnSubCategoria.textContent = "";
})
btnSubCategoria.addEventListener('click',(e)=>{
    e.preventDefault();

    var htmlSub = '';

    switch(btnCategoria.textContent){
        case "Soporte Movil":
            htmlSub = `
            <a class="dropdown-item">SM1</a>
            <a class="dropdown-item">SM2</a>
            <a class="dropdown-item">SM3</a>
            <a class="dropdown-item">SM4</a>
            `
            ;
          break;
        case "Soporte Equipo de Computo":
            htmlSub = `
            <a class="dropdown-item">SC1</a>
            <a class="dropdown-item">SC2</a>
            <a class="dropdown-item">SC3</a>
            <a class="dropdown-item">SC4</a>
            `
            ;
          break;
        case "Redes":
            htmlSub = `
            <a class="dropdown-item">R1</a>
            <a class="dropdown-item">R2</a>
            <a class="dropdown-item">R3</a>
            <a class="dropdown-item">R4</a>
            `
            ;
          break;
        case "Servidores":
            htmlSub = `
            <a class="dropdown-item">S1</a>
            <a class="dropdown-item">S2</a>
            <a class="dropdown-item">S3</a>
            <a class="dropdown-item">S4</a>
            `
            ;
          break;
        default:
          break;
    }
    
    dropdown.innerHTML = htmlSub;

})
btnCategoria.addEventListener('click',(e)=>{
    
})

btnCambios.addEventListener('click', (e)=>{
    e.preventDefault();

    var cat = document.querySelector('#dropdowncategoria').textContent;
    var sub = document.querySelector('#dropdownSubCategoria').textContent;
    var esp = document.querySelector('#selectp').value;
    
    db.collection('Tickets').doc(id).update({
        Estatus: 1,
        Categoria: cat,
        SubCat: sub,
        IdUsuarioEspecialista: esp
    }).then((e)=>{

        
        return window.document.location = './Admin.html';
    })
    
    
});