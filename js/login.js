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
        console.log(err);
    });
    
});

const formaregistrate = document.getElementById('sign-up-form');

formaregistrate.addEventListener('submit',(e)=>{
    e.preventDefault();

    const email = formaregistrate['remail'].value;
    const password = formaregistrate['rpassword'].value;

    auth.createUserWithEmailAndPassword(email,password).then( cred =>{

        return db.collection('Usuarios').doc(cred.user.uid).set({
            Nombre: formaregistrate['rnombre'].value,
            Telefono: formaregistrate['rtelefono'].value,
            Estatus: 0
        });


    }).then( ()=>{

        formaregistrate.reset();
        return window.document.location = 'DeskProfile/Empresa.html';

    }).catch( err => {
        formaregistrate.querySelector('.error').innerHTML = mensajeError(err.code);
    });


});
