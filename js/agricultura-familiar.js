$(document).ready(function(){
    
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            event.stopPropagation();
            if(form.checkValidity() === true){
                console.log("enviando...");
                var form_contact = $("#form-contact");
                var url = form_contact.attr('action');
                $.ajax({
                    type: "POST",
                    url: url,
                    data: form_contact.serialize(), // serializes the form's elements.
                    success: function(data){
                        $("#modal-msg-sent").modal('show');
                        setTimeout(function(){
                            $("#modal-msg-sent").modal('hide');
                        }, 10000);
                    }
                }); 
            }
                
            form.classList.add('was-validated');
        }, false);
    });

    $.ajax({
        dataType: "json",
        url: "/assets/agricultura-familiar/produtores.json",
        success: function(data){
            var table_elem = $("#table-products");
            
            var produtores = [];
            for(var i = 0 ; i < data.produtores.length ; i++){
                var row = $("<tr></tr>").append("<th>" + data.produtores[i].nome + "</th>");
                
                if(data.produtores[i].wa)
                    row.append("<td><a href=\"https://wa.me/55" + data.produtores[i].telefone.replace(/[^\d]/g, '') + "\">" + data.produtores[i].telefone + "<i class=\"fab fa-whatsapp ml-2\" style=\"color: #2ecc71;\"></i></a></td>");
                else
                    row.append("<td>" + data.produtores[i].telefone + "</td>");

                var produtos = "";

                for(var j = 0 ; j < data.produtores[i].produtos.length ; j++){
                    produtos += data.produtores[i].produtos[j].nome;
                    
                    if(j != data.produtores[i].produtos.length - 1)
                        produtos += "</br>";
                }

                row.append("<td>" + produtos + "</td>");

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