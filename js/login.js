const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

const formaingresar =  document.getElementById('sign-in-form');

formaingresar.addEventListener('submit',(e)=>{
    e.preventDefault();
    
    let correo = formaingresar['correo'].value;
    let contrasena = formaingresar['password'].value;

    auth.signInWithEmailAndPassword(correo,contrasena).then( cred =>{

        const id = cred.user.uid;

        db.collection('Usuarios').doc(id).get().then(datos =>{
            //localStorage.setItem("DatosUsuario",JSON.parse(datos));
            if(datos.data().Estatus == "0"){
                return window.document.location = 'DeskProfile/Empresa.html';
            }
            else if(datos.data().Estatus == "1"){
                return window.document.location = 'DeskProfile/Especialista.html';
            }
            else if(datos.data().Estatus == "2"){
                return window.document.location = 'DeskProfile/Admin.html';
            }
        }, err => {
            console.log(err.message);
        });
        
        formaingresar.reset();
        
    }).catch( err => {
        localStorage.setItem("DatosUsuario","");
        formaingresar.querySelector('.error').innerHTML = mensajeError(err.code);
    });
    
});

const formaregistrate = document.getElementById('sign-up-form');

formaregistrate.addEventListener('submit',(e)=>{
    e.preventDefault();

    const nombreUsuario = formaregistrate['rnombre'].value;
    const nombreEmpresa = formaregistrate['rnombreEmpresa'].value;
    const email = formaregistrate['remail'].value;
    const password = formaregistrate['rpassword'].value;
    const tel = formaregistrate['rtelefono'].value;
    console.log(tel,email,password,nombreUsuario,nombreEmpresa);
    
    

});


function mensajeError(codigo) {

    let mensaje = '';

    switch(codigo) {
        case 'auth/wrong-password':
          mensaje = 'Su contraseña no es correcta';
          break;
        case 'auth/user-not-found':
            mensaje = 'El usuario no existe o el correo no esta registrado';
            break;
        case 'auth/weak-password':
            mensaje = 'Contraseña débil debe tener al menos 6 caracteres';
            break;
        default:
            mensaje = 'Ocurrió un error al ingresar con este usuario';
      }
    return mensaje;
  }

  