$(document).ready(function(){
    
    // ----------------------------
    // Setup the publications table
    var table = $('#table-publications').DataTable({
        "ordering": true,
        "order": [[ 2, "desc" ]],
        "info": false,
        "searching": true,
        "lengthChange": false,
        "language": {
            "paginate": {
                "previous": "Anterior",
                "next": "Próxima"
            },
            "search": "Busca"
          } 
    });

    table.on( 'order.dt search.dt', function () {
        table.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();
    
});