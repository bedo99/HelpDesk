function addRowHandlers() {
    var rows = document.getElementById("dataTableEspecialista").rows;
    for (i = 0; i < rows.length; i++) {
        rows[i].onclick = function(){ return function(){
               var id = this.cells[0].innerHTML;
               return window.document.location = './TicketDescriptionEspecialista.html';
        };}(rows[i]);
    }
  }
  
  
window.onload = addRowHandlers();