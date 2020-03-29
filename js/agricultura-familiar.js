$(document).ready(function(){
    

    $.ajax({
        dataType: "json",
        url: "/assets/agricultura-familiar/produtores.json",
        success: function(data){
            var table_elem = $("#table-products");
            
            for(var i = 0 ; i < data.produtores.length ; i++){
                var row = $("<tr></tr>")
                    .append("<th>" + data.produtores[i].nome + "</th>")
                    .append("<td>" + data.produtores[i].telefone + "</td>");

                var  entrega = ""
                    ,produtos = ""
                    ,unidades = ""
                    ,valores = "";
                for(var j = 0 ; j < data.produtores[i].entrega.length ; j++){
                    entrega += data.produtores[i].entrega[j];

                    if(j != data.produtores[i].entrega.length - 1)
                        entrega += "</br>";
                }

                for(var j = 0 ; j < data.produtores[i].produtos.length ; j++){
                    produtos += data.produtores[i].produtos[j].nome;
                    unidades += data.produtores[i].produtos[j].unidade;
                    valores += "R$ " + data.produtores[i].produtos[j].preco;

                    if(j != data.produtores[i].produtos.length - 1){
                        produtos += "</br>";
                        unidades += "</br>";
                        valores += "</br>";
                    }
                }

                row
                    .append("<td>" + entrega + "</td>")
                    .append("<td>" + produtos + "</td>")
                    .append("<td>" + unidades + "</td>")
                    .append("<td>" + valores + "</td>");

                    table_elem.append(row);
            }

            initDataTables();
        }
    });

    function initDataTables(){
        var table = $('#table-products').DataTable({
            "ordering": false,
            "info": false,
            "searching": true,
            "paging": false,
            "lengthChange": false,
            "language": {
                "search": "Busca"
              } 
        });

        table.draw();

        $('#search-table').keyup(function(){
            table.search($(this).val()).draw() ;
        })
    }
    
});