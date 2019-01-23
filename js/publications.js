$(document).ready(function(){
    
    // ----------------------------
    // Setup the publications table
    $('#table-publications').DataTable({
        "ordering": false,
        "info": false,
        "searching": false,
        "lengthChange": false,
        "language": {
            "paginate": {
                "previous": "Anterior",
                "next": "Próxima"
            }
          } 
    });
    
});