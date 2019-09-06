$(document).ready(function(){
    var ranking_tsp = {};
    var base_score = 50;


    // -------------------------------------------
    // Create the ranking for the instance 
    readsJson();

    function createRanking(solutions){
        var groups = {};

        // Create the ranking for each instance
        var ranking_tsp1 = [];
        var ranking_tsp2 = [];
        var ranking_tsp3 = [];
        var main_ranking = [];

        for(var i = 0 ; i < solutions.length ; i++){
            if(solutions[i].instance_name == "tsp1")
                ranking_tsp1.push(solutions[i]);
            else if(solutions[i].instance_name == "tsp2")
                ranking_tsp2.push(solutions[i]);
            else if(solutions[i].instance_name == "tsp3")
                ranking_tsp3.push(solutions[i]);

            if(!(('group-' + solutions[i].group_id) in groups)){
                groups['group-' + solutions[i].group_id] = {
                    'group_id': solutions[i].group_id,
                    'group_name': solutions[i].group_name,
                    'group_members': solutions[i].group_members,
                    'group_members_short': solutions[i].group_members_short,
                    'points': 0
                };
            }
        }

        ranking_tsp1.sort(compareSolutions);
        ranking_tsp2.sort(compareSolutions);
        ranking_tsp3.sort(compareSolutions);

        // Evaluate the score of each group
        for(var i = 0 ; i < ranking_tsp1.length ; i++){
            var current_group = groups['group-' + ranking_tsp1[i].group_id];
            current_group.points += base_score - i;
            current_group.tsp1 = ranking_tsp1[i].solution_cost_evaluated;
        }

        for(var i = 0 ; i < ranking_tsp2.length ; i++){
            var current_group = groups['group-' + ranking_tsp2[i].group_id];
            current_group.points += base_score - i;
            current_group.tsp2 = ranking_tsp2[i].solution_cost_evaluated;
        }

        for(var i = 0 ; i < ranking_tsp3.length ; i++){
            var current_group = groups['group-' + ranking_tsp3[i].group_id];
            current_group.points += base_score - i;
            current_group.tsp3 = ranking_tsp3[i].solution_cost_evaluated;
        }

        
        for(key in groups){
            main_ranking.push(groups[key]);
        }

        main_ranking.sort(compareScores);

        // Fill in the rank table
        var table = $('#table-ranking tbody');
        for(var i = 0 ; i < main_ranking.length ; i++){
            table.append(
                '<tr style="line-height: 32px">' + 
                    '<th class="text-center">' + (i == 0 ? '<img src="/img/icons/medal-gold.svg" height="32" alt="">' : (i == 1 ? '<img src="/img/icons/medal-silver.svg" height="32" alt="">' : (i == 2 ? '<img src="/img/icons/medal-bronze.svg" height="32" alt="">' : (i + 1)))) + '</th>' + 
                    '<td>' + main_ranking[i].points + '</td>' + 
                    '<td>' + main_ranking[i].tsp1 + ' / ' + main_ranking[i].tsp2 + ' / ' + main_ranking[i].tsp3 + '</td>' + 
                    '<td>' + main_ranking[i].group_name + '</td>' +
                    '<td>' + main_ranking[i].group_members + '</td>' + 
                '</tr>');
        }

        // Fill in the podium
        $('#main-podium .podium-gold-group').html(main_ranking[0].group_members_short);
        $('#main-podium .podium-silver-group').html(main_ranking[1].group_members_short);
        $('#main-podium .podium-bronze-group').html(main_ranking[2].group_members_short);
    }

    function readsJson(){
        $.ajax({
            dataType: "json",
            url: "/assets/tsp-cup/tsp-solutions.json",
            success: function(data){
                createRanking(data.solutions);

                $('#rank-last-update').text('(Última atualização em ' + data['last-updated-date'] + ' às ' + data['last-updated-time'] + ')');
            }
        });
    }

    

    function compareSolutions(sol_1, sol_2){
        if(sol_1.solution_cost_evaluated < sol_2.solution_cost_evaluated)
            return -1;
        if(sol_1.solution_cost_evaluated > sol_2.solution_cost_evaluated)
            return 1;
        if(moment(sol_1.time_stamp).isBefore(moment(sol_2.time_stamp)))
            return -1;
        if(moment(sol_1.time_stamp).isAfter(moment(sol_2.time_stamp)))
            return 1;
        return 0;
    }

    function compareScores(score_1, score_2){
        if(score_1.points > score_2.points)
            return -1;
        if(score_1.points < score_2.points)
            return 1;

        if(score_1.tsp1 < score_2.tsp1)
            return -1;
        if(score_1.tsp1 > score_2.tsp1)
            return 1;

        if(score_1.tsp2 < score_2.tsp2)
            return -1;
        if(score_1.tsp2 > score_2.tsp2)
            return 1;

        if(score_1.tsp3 < score_2.tsp3)
            return -1;
        if(score_1.tsp3 > score_2.tsp3)
            return 1;

        return 0;
    }

});