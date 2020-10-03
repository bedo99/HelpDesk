const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
});

const formaingresar = document.getElementById('sign-in-form');

formaingresar.addEventListener('submit', (e) => {
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

        let usuario = response.data.res[0][0];
        sessionStorage.setItem("userSesion", JSON.stringify(usuario));
        switch (usuario.IdTipoUsuario) {
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
});

const formaregistrate = document.getElementById('sign-up-form');

formaregistrate.addEventListener('submit', (e) => {
    e.preventDefault();

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
