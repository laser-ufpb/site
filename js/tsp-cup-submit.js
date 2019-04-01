$(document).ready(function(){
    var num_vertices = 0;
    var coordinates = null;
    var distances = null;
    var current_instance = null;

    
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            event.stopPropagation();

            if(form.checkValidity() === false) {
                // event.preventDefault();
                event.stopPropagation();
            }
            else
                callValidation();
            
            form.classList.add('was-validated');
        }, false);
    });


    /****************************************************************************************
     * 
     * FUNCTION callValidation
     * 
     ****************************************************************************************/
    function callValidation(){
        $(this).toggleClass('d-none');
        $('#btn-sending').toggleClass('d-none');

        $('#container-alerts').empty();

        var instance_name = null;
        var group_id = $('#select-group option:selected').val();
        var group_name = $('#select-group option:selected').text();
        var solution_str = $('#textarea-solution').val();
        var solution_cost_user = $('#input-cost').val();

        switch(parseInt($('#select-instance option:selected').val())){
            case 1:
                instance_name = 'tsp1';
                break;
            case 2:
                instance_name = 'tsp2';
                break;
            case 3:
                instance_name = 'tsp3';
                break;
            
            // FOR DEBUG ONLY!!!
            case 4:
                instance_name = 'tsp4';
                break;
        }

        if(instance_name == null){
            alertUser('Alguma coisa saiu errado! Por favor, comunique o erro ao professor informando o código de erro.', 1, 60, 10);
        }
        else{
            var result = validateSolution(instance_name, solution_str, solution_cost_user);
            if(result.success){
                if($('#alert-successfully-sent').hasClass('d-none')){
                    // Show the success message
                    $('#alert-successfully-sent').removeClass('d-none');

                    // Hide the message after 10 seconds
                    setTimeout(function(){
                        $('#alert-successfully-sent').addClass('d-none');
                    }, 10000);

                    // Prepare the email
                    var message = "<strong>YAML:</strong><br>" +
                        "\tgroup_id: \"" + group_id + "\"" + "<br>" +
                        "\tgroup_name: \"" + group_name + "\"" + "<br>" +
                        "\tinstance: \"" + instance_name + "\"" + "<br>" +
                        "\ttime_stamp: \"" + moment().format() + "\"" + "<br>" +
                        "\tsolution_cost_user: " + solution_cost_user + "<br>" +
                        "\tsolution_cost_evaluated: " + result.cost_evaluated + "<br>" +
                        "\tsolution_user: \"" + solution_str + "\"<br><br>" +
                        "\tsolution: \"" + result.solution + "\"<br><br>" +
                        "<strong>Validation:</strong><br>" + 
                        "{<br>" + 
                        "\t\"solution\": {<br>" + 
                        "\t\t\"instance_name\": \"" + instance_name + "\",<br>" +  
                        "\t\t\"solution\": \"" + result.solution + "\",<br>" + 
                        "\t\t\"cost\": " + result.cost_evaluated + "<br>" +
                        "\t}<br>" + 
                        "}";

                    $('#input-email-msg').val(message);
                    $('#input-email-title').val("[TSP CUP] Grupo " + group_id);

                    // Send the email
                    $('#form-test').submit();
                }
            }
        }

        $(this).toggleClass('d-none');
        $('#btn-sending').toggleClass('d-none');
    };

    // -------------------------------------------
    // EVENT when the success message is closed
    $('#alert-successfully-sent .close').on('click', function(e){
        e.preventDefault();
        
        if(!$('#alert-successfully-sent').hasClass('d-none'))
            $('#alert-successfully-sent').addClass('d-none');

        return false;
    });

    /****************************************************************************************
     * 
     * FUNCTION validateSolution
     * 
     ****************************************************************************************/
    function validateSolution(instance_name, solution_str, solution_cost){
        var result = {
            'success': false,
            'cost_evaluated' : null,
            'solution': null
        }

        // -------------------------------------------
        // First parse the solution and check if its format is valid
        solution = solution_str.replace(/\s+/g,'').trim().split(',');
        for(var i = 0 ; i < solution.length ; i++){
            solution[i] = parseInt(solution[i]);

            if(isNaN(solution[i])){
                alertUser("A solução informada não está no formato correto! Leia as instruções acima para descobrir como formatar sua solução.", 1);
                return result;
            }
        }

        result.solution = solution.join(',');
        
        // -------------------------------------------
        // If the format is ok, read the instance
        var instance = readInstance(instance_name);

        // -------------------------------------------
        // Some simple checks
        if(solution.length != instance.num_vertices + 1){
            alertUser("O número de clientes na rota não condiz com o esperado para a instância escolhida! Deveriam haver <strong>" + (instance.num_vertices + 1) + " vértices </strong>. Leia as instruções acima para descobrir como formatar sua solução.", 1)
            return result;
        }

        if(solution[0] != solution[solution.length-1]){
            alertUser("Solução inviável, o primeiro vértice deve ser igual ao último!", 1);
            return result;
        }

        // -------------------------------------------
        // Check if each vertex is visited exactly once in the solution
        var is_visited = new Array(instance.num_vertices).fill(false);
        for(var i = 0 ; i < solution.length - 1; i++){
            // Make sure the current vertex is valid
            if(solution[i] >= instance.num_vertices || solution[i] < 0){
                alertUser("Solução inviável, o cliente " + solution[i] + " não existe!", 1);
                return result;
            }

            // Check if the current vertex has already been visited
            if(is_visited[solution[i]]){
                alertUser("Solução inviável, o cliente " + solution[i] + " é visitado mais de uma vez!", 1);
                return result;
            }

            is_visited[solution[i]] = true;
        }

        // // Check if there are vertices that were not visited
        // var not_visited = [];
        // for(var i = 0 ; i < instance.num_vertices; i++)
        //     if(!is_visited[i])
        //         not_visited.push(i);
        // if(not_visited.length > 0){
        //     alertUser("Solução inviável, os seguintes clientes nunca foram visitados {" +  not_visited.join(',') + "}", 1);
        //     return result;
        // }

        // -------------------------------------------
        // Evaluate the cost of the solution
        var solution_cost_double_check = 0;
        for(var i = 0 ; i < solution.length - 1; i++){
            var x1 = instance.coordinates[solution[i]][0];
            var y1 = instance.coordinates[solution[i]][1];
            var x2 = instance.coordinates[solution[i+1]][0];
            var y2 = instance.coordinates[solution[i+1]][1];
            solution_cost_double_check += evaluateDistance(x1, y1, x2, y2);
        }

        // -------------------------------------------
        // Make sure the cost informed by the user is the same as the one that was evaluated
        if(solution_cost_double_check != solution_cost){
            alertUser("A solução informada possui valor <strong>" + solution_cost_double_check + "</strong>, mas foi informado " + solution_cost + ". Note que iremos considerar o valor correto, mas isso pode indicar um bug em seu código.", 2);
        }

        result.success = true;
        result.cost_evaluated = solution_cost_double_check;

        return result;
    }
    
    
    /****************************************************************************************
     * 
     * FUNCTION readInstance
     * 
     ****************************************************************************************/
    function readInstance(instance_name){
        var instance = {
            'num_vertices': 0,
            'coordinates': null
        }

        $.ajax({
            url: '/assets/tsp-cup/instances/' + instance_name + '.txt',
            async: false,
            success: function(result){
                var rows = result.split('\n');
                var index_row = 0;

                // -------------------------------------------
                // Find the number of vertices
                while(index_row != rows.length){
                    if(rows[index_row] == "#num_vertices"){
                        index_row++;
                        instance.num_vertices = parseInt(rows[index_row]);
                        break;
                    }
                    index_row++;
                }

                // -------------------------------------------
                // Read the coordinates
                while(index_row != rows.length){
                    if(rows[index_row] == "#coordinates"){
                        index_row++;
                        break;
                    }
                    index_row++;
                }

                instance.coordinates = new Array(instance.num_vertices);
                for(var i = 0 ; i < instance.num_vertices ; i++){
                    var values = rows[index_row].replace(/\s+/g,' ').trim().split(' ');
                    instance.coordinates[i] = new Array(2);
                    instance.coordinates[i][0] = values[1];
                    instance.coordinates[i][1] = values[2];
                    index_row++;
                }
            }
        });

        return instance;
    }

    /****************************************************************************************
     * 
     * FUNCTION evaluateDistance
     * 
     ****************************************************************************************/
    function evaluateDistance(x1, y1, x2, y2){
        return Math.ceil(Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)))
    }

    /****************************************************************************************
     * 
     * FUNCTION alertUser
     * 
     ****************************************************************************************/
    function alertUser(message, type, dismiss_time = 15, codigo = null){
        console.log('hey');
        var $alert = $('<div class="alert alert-' + (type == 1 ? 'danger' : 'warning') + ' alert-dismissible fade show" role="alert"></div>')
                        .append('<strong>' + (type == 1 ? 'Erro' : 'Aviso') + (codigo != null ? (' ' + codigo) : '') + ':</strong> ' + message)
                        .append('<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>');

        $('#container-alerts').append($alert);

        // Remove the message after 10 seconds
        setTimeout(function(){
            $alert.remove();
        }, dismiss_time * 1000);

    }
});