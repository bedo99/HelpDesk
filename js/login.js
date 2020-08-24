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
    return window.document.location = 'DeskProfile/Admin.html';
    /*let correo = formaingresar['correo'].value;
    let contrasena = formaingresar['contrasena'].value;

    auth.signInWithEmailAndPassword(correo,contrasena).then( cred =>{

        const id = cred.user.uid;
        console.log(id);

        db.collection('Usuarios').doc(id).get().then(datos =>{
            if(datos.data().estatus == "0"){
                return window.document.location = './index.html';
            }
            else{
                return window.document.location = './Admin/index.html';
            }
        }, err => {
            console.log(err.message);
        });
       
        //window.document.location = './index.html';
        formaingresar.reset();
        
    }).catch( err => {
        
        console.log(err);
    });*/
    
});
