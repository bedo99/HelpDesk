function addRowHandlers() {
    var rows = document.getElementById("dataTableAdmin").rows;
    for (i = 0; i < rows.length; i++) {
        rows[i].onclick = function(){ return function(){
               var id = this.cells[0].innerHTML;
               return window.document.location = './TicketDescriptionAdmin.html';
        };}(rows[i]);
    }
  }
  
window.onload = addRowHandlers();