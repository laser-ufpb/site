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
            if(form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });
       
    function validateSolution(instance_name, solution_str, solution_cost){
        // -------------------------------------------
        // First parse the solution and check if its format is valid
        solution = solution_str.replace(/\s+/g,'').trim().split(',');
        try{
            for(var i = 0 ; i < solution.lenght ; i++)
                solution[i] = parseInt(solution[i]);
        }
        catch(e){
            // DEAL WITH FORMAT ERROR HERE!
            return false;
        }

        // -------------------------------------------
        // If the format is ok, read the instance
        var instance = readInstance(instance_name);

        // -------------------------------------------
        // Some simple checks
        if(solution.lenght != instance.num_vertices + 1){
            console.log("ERROR"); // TRATAR ERROR AQUI!
            return false;
        }

        if(solution[0] != solution[solution.length-1]){
            console.log("ERROR"); // TRATAR ERROR AQUI!
            return false;
        }
                
        // -------------------------------------------
        // Check if each vertex is visited exactly once in the solution
        var is_visited = new Array(instance.num_vertices).fill(false);
        for(var i = 0 ; i < solution.lenght - 1; i++){
            // Make sure the current vertex is valid
            if(solution[i] >= instance.num_vertices || solution[i] < 0){
                console.log("ERROR"); // TRATAR ERROR AQUI!
                return false;
            }

            // Check if the current vertex has already been visited
            if(is_visited[solution[i]]){
                console.log("ERROR"); // TRATAR ERROR AQUI!
                return false;
            }

            is_visited[solution[i]] = true;
        }

        // Check if there are vertices that were not visited
        var not_visited = [];
        for(var i = 0 ; i < instance.num_vertices; i++)
            if(!is_visited[i])
                not_visited.push(i);
        if(not_visited.length > 0){
            console.log("ERROR"); // TRATAR ERROR AQUI!
            return false;
        }

        // -------------------------------------------
        // Evaluate the cost of the solution
        var solution_cost_double_check = 0;
        for(var i = 0 ; i < solution.lenght - 1; i++){
            var x1 = instance.coordinates[solution[i]][0];
            var y1 = instance.coordinates[solution[i]][1];
            var x2 = instance.coordinates[solution[i+1]][0];
            var y2 = instance.coordinates[solution[i+1]][1];
            solution_cost_double_check += evaluateDistance(x1, y1, x2, y2);
        }

        // -------------------------------------------
        // Make sure the cost informed by the user is the same as the one that was evaluated
        if(solution_cost_double_check != solution_cost){
            console.log("WARNING"); // TRATAR WARNING AQUI!
        }

        return true;
    }
    
    
    function readInstance(instance_name){
        var instance = {
            'num_vertices': 0,
            'coordinates': null
        }

        $.get('/assets/tsp-cup/instances/' + instance_name + '.txt', function(result) {
            var rows = result.split('\n');
            var index_row = 0;

            // -------------------------------------------
            // Find the number of vertices
            while(index_row != rows.lenght){
                if(rows[index_row] == "#num_vertices"){
                    index_row++;
                    instance.num_vertices = parseInt(rows[index_row]);
                    break;
                }
                index_row++;
            }

            // -------------------------------------------
            // Read the coordinates
            while(index_row != rows.lenght){
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
        });

        return instance;
    }


    function evaluateDistance(x1, y1, x2, y2){
        return ceil(Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)))
    }
});