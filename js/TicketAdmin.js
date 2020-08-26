auth.onAuthStateChanged( user =>{

    if(user){
        console.log('Usuario entró');

        db.collection('Tickets').onSnapshot(snapshot =>{
            obtieneTickets(snapshot.docs);
            //configuraMenu(user);
        }, err => {
            console.log(err.message);
        });

    }
    else{
        console.log('Usuario salió');
        obtieneTickets([]);
        //configuraMenu();
    }

});

const ListaTicketsCard = document.getElementById('ListaTicketsCard');

const obtieneTickets = (data) =>{


    if(data.length){
        
        let html = '';

        data.forEach(doc => {
            const producto = doc.data();
            const columna = `
            <div class="col-12 col-md-6 col-lg-4 mt-5" data-aos="fade-up" data-aos-duration='2000'>
                <div class="card">
                    <div class="card-head">
                        <div class="row">
                        <img src="./img/logotipoBlanco.png" alt="logo" class="card-logo">
                        <h2>${producto.Nombre}</h2>
                        </div>
                        <img src="${producto.imagen}" alt="Imagen" class="product-img">
                    </div>
                    <div class="card-body">
                        <span class="new">New</span>
                            <div class="container">
                                <p class="product-des">
                                    ${producto.descripcion}
                                </p>
                            </div>
                            <span class="product-rating">
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star grey"></i>
                            </span>
                        <div class="row">
                            <div class="col-7 mt-3" style="text-align: center;">
                                <p class="product-price">
                                MX<b>${producto.precio}</b>
                                </p>
                            </div>
                            <div class="col-5 mt-3">
                                <button id="boton" onclick="addToCart('${doc.id}', '${producto.nombre}',
                                '${producto.descripcion}', '${producto.imagen}', '${producto.precio}')">
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;
            html += columna;
    
        });
    
        ListaTicketsCard.innerHTML = html;

    }
    else{
        ListaTicketsCard.innerHTML = '<p class="text-center">Ingrese con sus claves para ver los productos.</p>';
    }
 };