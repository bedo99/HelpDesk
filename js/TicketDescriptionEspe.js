auth.onAuthStateChanged( user =>{

    if(user){
        
        const usuario = document.getElementById('CorreoEspecialista');
        usuario.innerHTML = user.email;
        
    }
    else{

    }

});

salir.addEventListener('click', (e)=>{
    e.preventDefault();
    auth.signOut().then(()=>{
        localStorage.clear();
        return window.document.location = '../index.html';
    });

});


var id = localStorage.getItem('Ticketview');
var tituloT = document.getElementById('tituloticket');
var DescrT = document.getElementById('Descripcionticket');


var docRef = db.collection('Tickets').doc(id);
docRef.get().then(function(doc) {
    if (doc.exists) {
        tituloT.innerHTML = doc.data().NombreT;
        DescrT.innerHTML = doc.data().DescripcionT;
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});
/*const ViewTicket = (data)=>{
	console.log(data);
}*/