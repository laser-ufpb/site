$(document).ready(function(){
    
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
            if(form.checkValidity() === false) {
                event.preventDefault();
            event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });

    // $("#form-contact").submit(function(e) {
    //     e.preventDefault(); // avoid to execute the actual submit of the form.
    //     var form = $(this);
    //     var url = form.attr('action');
    //     $.ajax({
    //         type: "POST",
    //         url: url,
    //         data: form.serialize(), // serializes the form's elements.
    //         success: function(data){
    //             $("#modal-msg-sent").modal('show');
    //             setTimeout(function(){
    //                 $("#modal-msg-sent").modal('hide');
    //             }, 10000);
    //         }
    //     }); 
    // });

    $.ajax({
        dataType: "json",
        url: "/assets/agricultura-familiar/produtores.json",
        success: function(data){
            var table_elem = $("#table-products");
            
            var produtores = [];
            for(var i = 0 ; i < data.produtores.length ; i++){
                var row = $("<tr></tr>")
                    .append("<th>" + data.produtores[i].nome + "</th>");
                    // .append("<td>" + data.produtores[i].municipio + "</td>");

                if(data.produtores[i].wa)
                    row.append("<td>" + data.produtores[i].telefone + "<i class=\"fab fa-whatsapp ml-2\" style=\"color: #2ecc71;\"></i></td>");
                else
                    row.append("<td>" + data.produtores[i].telefone + "</td>");

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
                    // unidades += data.produtores[i].produtos[j].unidade;
                    
                    if(data.produtores.tem_preco){
                        if(data.produtores[i].produtos[j].preco == "-")
                            valores += "A combinar";
                        else
                            valores += "R$ " + data.produtores[i].produtos[j].preco;
                    }

                    if(j != data.produtores[i].produtos.length - 1){
                        produtos += "</br>";
                        // unidades += "</br>";
                        valores += "</br>";
                    }
                }

                if(!data.produtores[i].tem_preco)
                    valores = "A combinar";

                row
                    .append("<td>" + entrega + "</td>")
                    .append("<td>" + produtos + "</td>")
                    // .append("<td>" + unidades + "</td>")
                    .append("<td>" + valores + "</td>");

                produtores.push(row);
            }

            // Shuffle array
            produtores = shuffle(produtores);

            for(var i = 0 ; i < produtores.length ; i++)
                table_elem.append(produtores[i]);

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

    function shuffle(array) {
        var m = array.length, t, i;
      
        // While there remain elements to shuffle…
        while (m) {
      
          // Pick a remaining element…
          i = Math.floor(Math.random() * m--);
      
          // And swap it with the current element.
          t = array[m];
          array[m] = array[i];
          array[i] = t;
        }
      
        return array;
      }
    
});