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

    axios({
        method: 'post',
        url: 'http://localhost:3000/loginUsuario/',
        data: {
            Correo: correo,
            Contrasena: contrasena
        }
    }).then(response => {
        
<<<<<<< HEAD
    }).catch( err => {
        localStorage.setItem("DatosUsuario","");
        formaingresar.querySelector('.error').innerHTML = mensajeError(err.code);
    });
    
=======
        let usuario = response.data.res[0][0];
        sessionStorage.setItem("userSesion", JSON.stringify(usuario));
        switch(usuario.IdTipoUsuario){
            case 1: 
                window.document.location = 'DeskProfile/Especialista.html';
                break;
            case 2: 
                window.document.location = 'DeskProfile/Admin.html';
                break;
            case 3: 
                window.document.location = 'DeskProfile/Empresa.html';
                break;
        }
        formaingresar.reset();  
    });      
>>>>>>> ed4a700d1a381907ada3c1affb54b99aca4c3227
});

const formaregistrate = document.getElementById('sign-up-form');

formaregistrate.addEventListener('submit',(e)=>{
    e.preventDefault();

<<<<<<< HEAD
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

  
=======
    const name = formaregistrate['rnombre'].value;
    const email = formaregistrate['remail'].value;
    const password = formaregistrate['rpassword'].value;
    const Telefono = formaregistrate['rtelefono'].value;
    const NombreEmpresa = formaregistrate['rnombreEmpresa'].value;
    axios({
        method: 'post',
        url: 'http://localhost:3000/registroUsuario/',
        data: {
            NombreUsuario: name,
            Correo: email,
            Contrasena: password,
            Telefono: Telefono,
            NombreEmpresa: NombreEmpresa
        }
    }).then(response => {
        Swal.fire(
            'Registro Correcto',
            'Ahora ya puedes iniciar Sesión',
            'success'
          )
        formaregistrate.reset();
        container.classList.remove("sign-up-mode");
    });

});
>>>>>>> ed4a700d1a381907ada3c1affb54b99aca4c3227
