

const tituloT = document.querySelector('#tituloticket');
const DescrT = document.querySelector('#Descripcionticket');

let TicketfechaEmpezado = document.querySelector('#TicketfechaEmpezado');
let ticketCreador = document.querySelector('#ticketCreador');
let ticketEspecialista = document.querySelector('#ticketEspecialista');
let ticketStatus = document.querySelector('#ticketStatus');

const dropdown = document.querySelector('#DropDown');
const btnCambios = document.querySelector('#btnCambios');
const btnCategoria = document.querySelector('#dropdowncategoria');
const btnSubCategoria = document.querySelector('#dropdownSubCategoria');
const usuario = document.querySelector('#CorreoEspecialista');
const usuariosEspecialista = document.querySelector('#selectp');

let usuarioSession = JSON.parse(sessionStorage.getItem("userSesion"));
if (!usuarioSession) {
  window.document.location = '../index.html';
}
usuario.innerHTML = "Administrador : " + usuarioSession.NombreUsuario;
var IdTicket_ = sessionStorage.getItem('Ticketview');
let html = '';
var Cambiosestatus = '';

// auth.onAuthStateChanged(user => {

//   if (user) {
//     usuario.innerHTML = "Administrador : " + user.email;
//     db.collection('Usuarios').where('Estatus', '==', 1)
//       .get()
//       .then((useresp) => {
//         obtenerUE(useresp.docs);
//       })
//   }
//   else { }

// });

axios({
  method: 'post',
  url: 'http://localhost:3000/obtenerTicket/',
  data: {
    IdTicket: IdTicket_
  }
}).then(response => {

  axios({
    method: 'post',
    url: 'http://localhost:3000/obtenerAdjuntoTicket/',
    data: {
      ArchivoAdjuntoTicket: response.data.ArchivoAdjuntoTicket
    }
  }).then(response => {
    //TODO
  });
  tituloT.innerHTML = response.data.NombreTicket;
  DescrT.innerHTML = response.data.DescripcionTicket;
  TicketfechaEmpezado.innerHTML = response.data.FechaInicioTicket ? response.data.FechaInicioTicket : "SIN INICIAR";
  ticketCreador.innerHTML = response.data.Creador;
  ticketEspecialista.innerHTML = response.data.Especialista;

  switch(response.data.EstatusTicket){
    case 1:
      ticketStatus.innerHTML = '<span class="text-primary">Pendiente</span>';
      break;
    case 2:
      ticketStatus.innerHTML = '<span class="text-success">Abierto</span>';
      break;
    case 3:
      ticketStatus.innerHTML = '<span class="text-warning">En Proceso</span>';
      break;
    case 4:
      ticketStatus.innerHTML = '<span class="text-danger">Finalizado</span>';
      break;
    case 5:
      ticketStatus.innerHTML = '<span class="text-verify">Verificado</span>';
      break;
    case 6:
      ticketStatus.innerHTML = '<span class="text-dark">Terminado</span>';
      break;
    default:
      break;
  }
  //Obteneradjutno(doc.data().Adjunto);
});


let html3 = '';
const Obteneradjutno = (data) => {
  var s = data.split(".");
  if (s[1].toLowerCase() == "mp4") {
    storage.ref().child(data).getDownloadURL().then((url) => {


      var video = document.getElementById('Adjunto');
      const v =
        `
            <h2>Adjuntos</h2>
            <video src="${url}" width="320"  height="240" controls></video>
            `;
      html3 += v;
      video.innerHTML = html3;

    }).catch(function (error) {
      // Handle any errors
    });
  }
  else if (s[1].toLowerCase() == "mp3" || s[1].toLowerCase() == "mpeg") {
    storage.ref().child(data).getDownloadURL().then((url) => {


      var Audio = document.getElementById('Adjunto');
      const audio =
        `
            <h2>Adjuntos</h2>
            <audio src="${url}" controls></audio>
            `;
      html3 += audio;
      Audio.innerHTML = html3;

    }).catch(function (error) {
      // Handle any errors
    });
  }
  else if (s[1].toLowerCase() == "jpg" || s[1].toLowerCase() == "png" || s[1].toLowerCase() == "jpeg") {
    storage.ref().child(data).getDownloadURL().then((url) => {

      var image = document.getElementById('Adjunto');
      const imagen =
        `
            <h2>Adjuntos</h2>
            <img src="${url}"></img>
            `;
      html3 += imagen;
      image.innerHTML = html3;



    }).catch(function (error) {
      // Handle any errors
    });
  }
}


axios({
  method: 'get',
  url: 'http://localhost:3000/obtenerEspecialistas/',
}).then(response => {
  obtenerUE(response.data.res[0])

});

const obtenerUE = (data) => {
  if (data.length) {
    let html = '';
    var rowespecialista = '';
    data.forEach(usuario => {
      rowespecialista = `
                <a class="dropdown-item text-dark" value="${usuario.IdUsuario}">${usuario.NombreUsuario}</a>
            `;
      html += rowespecialista;
    });
    usuariosEspecialista.innerHTML = html;
  }
}

btnCategoria.addEventListener('click', (e) => {
  btnSubCategoria.textContent = "";
})
btnSubCategoria.addEventListener('click', (e) => {
  e.preventDefault();

  var htmlSub = '';

  switch (btnCategoria.textContent) {
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

});

btnCategoria.addEventListener('click', (e) => {

});

btnCambios.addEventListener('click', (e) => {
  e.preventDefault();

  var cat = document.querySelector('#dropdowncategoria').textContent;
  var sub = document.querySelector('#dropdownSubCategoria').textContent;
  var esp = document.querySelector('#selectp').value;

  db.collection('Tickets').doc(id).update({
    Estatus: 1,
    Categoria: cat,
    SubCat: sub,
    IdUsuarioEspecialista: esp
  }).then((e) => {


    return window.document.location = './Admin.html';
  })


});



salir.addEventListener('click', (e) => {
  e.preventDefault();
  localStorage.clear();
  return window.document.location = '../index.html';

});